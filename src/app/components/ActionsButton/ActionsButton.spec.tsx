import * as React from "react";
import { ActionsButton } from "./ActionsButton";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import configureMockStore from "redux-mock-store";
import * as ReactReduxHooks from "react-redux";
import {
  levelsDefaultState,
  LevelsState
} from "../../store/levels/levels.reducer";
import * as levelsActions from "../../store/levels/levels.actions";

describe("ActionsButton", () => {
  const mockStore = configureMockStore();
  let store = mockStore();
  let component: ReactWrapper;

  const mountComponent = (initialState: Partial<LevelsState> = {}) => {
    store = mockStore({ levels: { ...levelsDefaultState, ...initialState } });

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    component = mount(
      <Provider store={store}>
        <ActionsButton />
      </Provider>
    );
  };

  afterEach(() => {
    component.unmount();
  });

  it("should call autoOpenCell when button is clicked", () => {
    mountComponent();
    component.find("#auto-open-cell").simulate("click");
    expect(store.getActions()).toEqual([levelsActions.autoOpenItem()]);
  });

  it("should call autoOpenMap when button is clicked", () => {
    mountComponent();
    component.find("#auto-open-map").simulate("click");
    expect(store.getActions()).toEqual([levelsActions.autoOpenMap()]);
  });

  it("should call autoOpenMap when button is clicked", () => {
    mountComponent({ lose: true });
    levelsActions.setLosing();
    component.find("#restart").simulate("click");
    expect(store.getActions()).toEqual([
      levelsActions.changeLevel(levelsDefaultState.currentLevelIndex)
    ]);
  });
});
