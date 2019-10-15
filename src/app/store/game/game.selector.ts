import { createSelector } from "reselect";
import { GameState } from "./game.reducer";
import { RootState } from "../rootState";

const gameSelector = (state: RootState): GameState => state.game;

export const currentLinkSelector = createSelector(
  gameSelector,
  (state: GameState): string => state.currentLink
);

export const connectionSelector = createSelector(
  gameSelector,
  (state: GameState): boolean => state.connection
);

export const errorSelector = createSelector(
  gameSelector,
  (state: GameState): string => state.error
);
