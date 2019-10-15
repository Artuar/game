import { createSelector } from "reselect";
import { RootState } from "app/store/rootState";
import { LevelsState } from "app/store/levels/levels.reducer";
import { LevelMap } from "app/store/levels/levels.types";

const levelsSelector = (state: RootState): LevelsState => state.levels;

export const levelsListSelector = createSelector(
  levelsSelector,
  (state: LevelsState): string[] => state.levelsList
);

export const currentLevelSelector = createSelector(
  levelsSelector,
  ({ currentLevelIndex, levelsList }): string => levelsList[currentLevelIndex]
);

export const currentLevelIndexSelector = createSelector(
  levelsSelector,
  ({ currentLevelIndex }): number => currentLevelIndex
);

export const currentMapSelector = createSelector(
  levelsSelector,
  (state: LevelsState): LevelMap => state.currentMapMask
);

export const loseStateSelector = createSelector(
  levelsSelector,
  (state: LevelsState): boolean => state.lose
);

export const passwordSelector = createSelector(
  levelsSelector,
  (state: LevelsState): string | undefined => state.password
);

export const autoOpenSelector = createSelector(
  levelsSelector,
  (state: LevelsState): boolean => state.autoOpen
);
