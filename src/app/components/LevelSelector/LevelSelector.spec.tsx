import * as React from "react";
import { LevelSelector } from "./LevelSelector";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import configureMockStore from "redux-mock-store";
import * as ReactReduxHooks from "react-redux";
import * as levelsActions from "../../store/levels/levels.actions";
import { levelsDefaultState } from "../../store/levels/levels.reducer";

const TEST_LEVEL_INDEX = 1;

describe("LevelSelector", () => {
  const mockStore = configureMockStore();
  let store = mockStore();
  let component: ReactWrapper;

  beforeEach(() => {
    store = mockStore({ levels: levelsDefaultState });

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    component = mount(
      <Provider store={store}>
        <LevelSelector />
      </Provider>
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it("should render buttons for choosing level", () => {
    expect(component.find("#level-buttons-wrapper button")).toHaveLength(4);
  });

  it("should change level to chosen", () => {
    component.find(`#level-button-${TEST_LEVEL_INDEX}`).simulate("click");
    expect(store.getActions()).toEqual([
      levelsActions.changeLevel(TEST_LEVEL_INDEX)
    ]);
  });
});
