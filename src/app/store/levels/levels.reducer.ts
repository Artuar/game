import { RootAction } from "app/store/rootActions";
import { getType } from "typesafe-actions";
import * as actions from "./levels.actions";
import { GAME_LEVELS } from "./levels.constants";
import { LevelMap } from "./levels.types";
import * as gameActions from "../game/game.actions";

export interface LevelsState {
  levelsList: string[];
  currentLevelIndex: number;
  currentMapMask: LevelMap;
  lose: boolean;
  password: string | undefined;
  autoOpen: boolean;
}

export const levelsDefaultState: LevelsState = {
  levelsList: GAME_LEVELS,
  currentLevelIndex: 0,
  currentMapMask: [],
  lose: false,
  password: undefined,
  autoOpen: false
};

export const levelsReducer = (
  state: LevelsState = levelsDefaultState,
  action: RootAction
) => {
  switch (action.type) {
    case getType(gameActions.setConnectionState): {
      return levelsDefaultState;
    }
    case getType(actions.changeLevel): {
      return {
        ...state,
        currentLevelIndex: action.payload,
        currentMapMask: [],
        lose: false,
        password: undefined,
        autoOpen: false
      };
    }
    case getType(actions.setMap): {
      return {
        ...state,
        currentMapMask: action.payload
      };
    }
    case getType(actions.setLosing): {
      return {
        ...state,
        lose: true
      };
    }
    case getType(actions.setPassword): {
      return {
        ...state,
        password: action.payload
      };
    }
    case getType(actions.autoOpenMap): {
      return {
        ...state,
        autoOpen: true
      };
    }
    default:
      return state;
  }
};
