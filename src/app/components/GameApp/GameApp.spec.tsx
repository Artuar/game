import * as React from "react";
import { GameApp } from "./GameApp";
import { Provider } from "react-redux";
import { shallow } from "enzyme";
import configureMockStore from "redux-mock-store";

const mockStore = configureMockStore();
const store = mockStore({});

describe("GameApp", () => {
  it("should render GameApp without throwing an error", () => {
    shallow(
      <Provider store={store}>
        <GameApp />
      </Provider>
    );
  });
});
