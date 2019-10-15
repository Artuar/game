import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentMapSelector,
  loseStateSelector,
  passwordSelector
} from "../../store/levels/levels.selector";
import classNames from "classnames";
import * as styles from "./Map.css";
import * as levelsActions from "../../store/levels/levels.actions";
import { CLOSED_CELL } from "../../store/levels/levels.constants";

const useStateSelectors = () => ({
  currentMap: useSelector(currentMapSelector),
  lose: useSelector(loseStateSelector),
  password: useSelector(passwordSelector)
});

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    openItem: (x: number, y: number) =>
      dispatch(levelsActions.openItem({ x, y }))
  };
};

export const Map: React.FunctionComponent = () => {
  const { currentMap, lose, password } = useStateSelectors();
  const { openItem } = useDispatchActions();

  return (
    <div className={styles.content}>
      <div className={styles.mapWrapper} id="map">
        {lose ? (
          <div className={styles.finalText}>You lose</div>
        ) : password ? (
          <div className={styles.finalText}>{`You win. ${password}`}</div>
        ) : currentMap.length ? (
          <>
            {currentMap.map((row, rIndex) => (
              <div className={styles.row} key={rIndex}>
                {row.map((item, cIndex) => (
                  <button
                    id={`cell-${cIndex}-${rIndex}`}
                    title={`position: ${cIndex} ${rIndex}`}
                    key={cIndex}
                    className={classNames(styles.itemButton, {
                      [styles.opened]: item !== CLOSED_CELL
                    })}
                    disabled={item !== CLOSED_CELL}
                    onClick={() => openItem(cIndex, rIndex)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};
