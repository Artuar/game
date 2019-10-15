import { RootAction } from "app/store/rootActions";
import { getType } from "typesafe-actions";
import * as actions from "./game.actions";
import { DEFAULT_LINK } from "./game.constants";

export interface GameState {
  currentLink: string;
  connection: boolean;
  error: string;
}

export const gameDefaultState: GameState = {
  currentLink: DEFAULT_LINK,
  connection: false,
  error: ""
};

export const gameReducer = (
  state: GameState = gameDefaultState,
  action: RootAction
) => {
  switch (action.type) {
    case getType(actions.changeLink): {
      return {
        ...state,
        currentLink: action.payload,
        error: ""
      };
    }
    case getType(actions.setConnectionState): {
      return {
        ...state,
        connection: action.payload,
        error: action.payload ? "" : state.error
      };
    }
    case getType(actions.setError): {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
};
