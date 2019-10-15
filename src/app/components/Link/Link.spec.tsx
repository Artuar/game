import * as React from "react";
import { Link } from "./Link";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import configureMockStore from "redux-mock-store";
import * as ReactReduxHooks from "react-redux";
import * as gameActions from "../../store/game/game.actions";
import { gameDefaultState, GameState } from "../../store/game/game.reducer";

const TEST_LINK = "test";

describe("Link", () => {
  const mockStore = configureMockStore();
  let store = mockStore();
  let component: ReactWrapper;

  const mountComponent = (initialState: Partial<GameState> = {}) => {
    store = mockStore({ game: { ...gameDefaultState, ...initialState } });

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    component = mount(
      <Provider store={store}>
        <Link />
      </Provider>
    );
  };

  afterEach(() => {
    component.exists() && component.unmount();
  });

  it("should call startGame when button is clicked", () => {
    mountComponent();
    component.find("#start-game").simulate("click");
    expect(store.getActions()).toEqual([gameActions.startGame()]);
  });

  it("should call changeLink when text is changed", () => {
    mountComponent();
    component
      .find("#game-link")
      .simulate("change", { target: { value: TEST_LINK } });
    expect(store.getActions()).toEqual([gameActions.changeLink(TEST_LINK)]);
  });

  it("should call finishGame before component unmount", () => {
    mountComponent();
    component.unmount();
    expect(store.getActions()).toEqual([gameActions.finishGame()]);
  });

  it("should call finishGame when button is clicked", () => {
    mountComponent({ connection: true });
    component.find("#finish-game").simulate("click");
    expect(store.getActions()).toEqual([gameActions.finishGame()]);
  });
});
