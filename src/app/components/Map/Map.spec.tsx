import * as React from "react";
import { Map } from "./Map";
import { Provider } from "react-redux";
import { mount, ReactWrapper } from "enzyme";
import configureMockStore from "redux-mock-store";
import { CLOSED_CELL } from "../../store/levels/levels.constants";
import * as ReactReduxHooks from "react-redux";
import { levelsDefaultState } from "../../store/levels/levels.reducer";
import * as levelsActions from "../../store/levels/levels.actions";

describe("Map", () => {
  const mockStore = configureMockStore();
  let store = mockStore();
  let component: ReactWrapper;

  beforeEach(() => {
    store = mockStore({
      levels: {
        ...levelsDefaultState,
        currentMapMask: [
          ["1", "1", "1"],
          ["1", CLOSED_CELL, "1"],
          ["1", "1", "1"]
        ]
      }
    });

    jest
      .spyOn(ReactReduxHooks, "useDispatch")
      .mockImplementation(() => store.dispatch);

    component = mount(
      <Provider store={store}>
        <Map />
      </Provider>
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it("should call openCell when button is clicked", () => {
    component.find("#cell-1-1").simulate("click");
    expect(store.getActions()).toEqual([
      levelsActions.openItem({ x: 1, y: 1 })
    ]);
  });
});
