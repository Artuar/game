import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as gameActions from '../../store/game/game.actions';
import { currentLinkSelector } from 'app/store/game/game.selector';
import * as styles from './Search.css';

const useStateSelectors = () => ({
  currentLink: useSelector(currentLinkSelector),
});

const useDispatchActions = () => {
  const dispatch = useDispatch();
  return {
    changeLink: (link: string) => dispatch(gameActions.changeLink(link)),
    startGame: () => dispatch(gameActions.startGame()),
  };
};

export const Search: React.FunctionComponent = () => {
  const { currentLink } = useStateSelectors();
  const { startGame, changeLink } = useDispatchActions();

  const handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.which === 13) {
      startGame();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeLink(event.target.value );
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        autoFocus
        placeholder={'Link to game service'}
        value={currentLink}
        onChange={handleChange}
        onKeyDown={handleSubmit}
      />
      <button onClick={startGame}>startGame</button>
    </div>
  );
};
