import { GameState } from "app/store/game/game.reducer";
import { LevelsState } from "app/store/levels/levels.reducer";

export interface RootState {
  game: GameState;
  levels: LevelsState;
}
