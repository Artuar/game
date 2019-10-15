import { combineReducers } from "redux";
import { gameReducer } from "./game/game.reducer";
import { levelsReducer } from "app/store/levels/levels.reducer";

export const rootReducer = combineReducers({
  game: gameReducer,
  levels: levelsReducer
});
