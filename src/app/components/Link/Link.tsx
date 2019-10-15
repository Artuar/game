import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as gameActions from "../../store/game/game.actions";
import {
  connectionSelector,
  currentLinkSelector,
  errorSelector
} from "../../store/game/game.selector";
import * as styles from "./Link.css";
import { useEffect } from "react";

const useStateSelectors = () => ({
  currentLink: useSelector(currentLinkSelector),
  connection: useSelector(connectionSelector),
  error: useSelector(errorSelector)
});

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    changeLink: (link: string) => dispatch(gameActions.changeLink(link)),
    startGame: () => dispatch(gameActions.startGame()),
    finishGame: () => dispatch(gameActions.finishGame())
  };
};

export const Link: React.FunctionComponent = () => {
  const { currentLink, connection, error } = useStateSelectors();
  const { startGame, changeLink, finishGame } = useDispatchActions();

  useEffect(
    () => () => {
      finishGame();
    },
    []
  );

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.which === 13) {
      startGame();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeLink(event.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.link}>
        {connection ? (
          <button id="finish-game" onClick={finishGame}>
            Finish Game
          </button>
        ) : (
          <>
            <input
              id="game-link"
              type="text"
              autoFocus
              placeholder={"Link to game service"}
              value={currentLink}
              onChange={handleChange}
              onKeyDown={handleSubmit}
            />
            <button id="start-game" onClick={startGame}>
              Start Game
            </button>
          </>
        )}
      </div>
      {error ? <div className={styles.error}>{error}</div> : null}
    </div>
  );
};
