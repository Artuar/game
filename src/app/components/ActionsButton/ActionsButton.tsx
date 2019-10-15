import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loseStateSelector,
  passwordSelector,
  currentLevelIndexSelector
} from "../../store/levels/levels.selector";
import * as styles from "./ActionsButton.css";
import * as levelsActions from "../../store/levels/levels.actions";

const useStateSelectors = () => ({
  lose: useSelector(loseStateSelector),
  password: useSelector(passwordSelector),
  levelIndex: useSelector(currentLevelIndexSelector)
});

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    autoOpenCell: () => dispatch(levelsActions.autoOpenItem()),
    autoOpenMap: () => dispatch(levelsActions.autoOpenMap()),
    restart: (levelIndex: number) =>
      dispatch(levelsActions.changeLevel(levelIndex))
  };
};

export const ActionsButton: React.FunctionComponent = () => {
  const { lose, password, levelIndex } = useStateSelectors();
  const { autoOpenCell, autoOpenMap, restart } = useDispatchActions();

  return (
    <div className={styles.buttons}>
      {lose || password ? (
        <>
          <button id="restart" onClick={() => restart(levelIndex)}>
            Restart
          </button>
        </>
      ) : (
        <>
          <button id="auto-open-cell" onClick={autoOpenCell}>
            Auto open cell
          </button>
          <button id="auto-open-map" onClick={autoOpenMap}>
            Auto open map
          </button>
        </>
      )}
    </div>
  );
};
