import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentLevelSelector,
  levelsListSelector
} from "../../store/levels/levels.selector";
import * as styles from "./LevelSelector.css";
import * as levelsActions from "../../store/levels/levels.actions";
import classNames from "classnames";

const useStateSelectors = () => ({
  levels: useSelector(levelsListSelector),
  currentLevel: useSelector(currentLevelSelector)
});

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    chooseLevel: (levelIndex: number) =>
      dispatch(levelsActions.changeLevel(levelIndex))
  };
};

export const LevelSelector: React.FunctionComponent = () => {
  const { levels, currentLevel } = useStateSelectors();
  const { chooseLevel } = useDispatchActions();

  return (
    <div className={styles.levels} id="level-buttons-wrapper">
      {levels.map((level, index) => (
        <button
          id={`level-button-${index}`}
          key={index}
          className={classNames(styles.level, {
            [styles.active]: currentLevel === level
          })}
          onClick={() => chooseLevel(index)}
        >
          {level}
        </button>
      ))}
    </div>
  );
};
