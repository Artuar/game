import { combineReducers } from 'redux';
import { gameReducer } from './game/game.reducer';

export const rootReducer = combineReducers({
  game: gameReducer,
});
