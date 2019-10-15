import { RootAction } from 'app/store/rootActions';
import { getType } from 'typesafe-actions';
import * as actions from './game.actions';
import { GAME_LEVELS, DEFAULT_LINK } from 'app/store/game/game.constants';

export interface GameState {
  currentLink: string;
  connection: boolean;
  levels: string[],
  currentLevelIndex: number;
  currentMapMask: string | undefined;
  lose: boolean;
}

export const gameDefaultState: GameState = {
  currentLink: DEFAULT_LINK,
  connection: false,
  levels: GAME_LEVELS,
  currentLevelIndex: 0,
  currentMapMask: undefined,
  lose: false
};

export const gameReducer = (
  state: GameState = gameDefaultState,
  action: RootAction
) => {
  switch (action.type) {
    case getType(actions.changeLink): {
      return {
        ...state,
        currentLink: action.payload
      };
    }
    case getType(actions.setConnectionState): {
      return {
        ...state,
        connection: action.payload
      };
    }
    case getType(actions.chooseLevel): {
      return {
        ...state,
        currentLevelIndex: action.payload,
        currentMapMask: undefined,
        lose: false
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
    default:
      return state;
  }
};
