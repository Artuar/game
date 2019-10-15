import * as React from 'react';
import { useSelector } from 'react-redux';
import { currentMapSelector } from 'app/store/game/game.selector';
import * as styles from './Map.css';

const useStateSelectors = () => ({
  currentMap: useSelector(currentMapSelector),
});

export const Map: React.FunctionComponent = () => {
  const { currentMap } = useStateSelectors();

  return (
    <div className={styles.map}>
      {currentMap}
    </div>
  );
};
