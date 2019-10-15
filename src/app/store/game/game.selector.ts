import { createSelector } from 'reselect';
import { GameState } from 'app/store/game/game.reducer';
import { RootState } from 'app/store/rootState';

const passwordsSelector = (state: RootState): GameState => state.game;

export const currentLinkSelector = createSelector(
  passwordsSelector,
  (state: GameState): string => state.currentLink,
);

export const currentLevelSelector = createSelector(
  passwordsSelector,
  ({currentLevelIndex, levels}): string => levels[currentLevelIndex],
);

export const currentMapSelector = createSelector(
  passwordsSelector,
  (state: GameState): string | undefined => state.currentMapMask,
);
