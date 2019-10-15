import * as React from "react";
import { Link } from "../Link/Link";
import { Map } from "../Map/Map";
import * as styles from "./GameApp.css";
import { LevelSelector } from "../LevelSelector/LevelSelector";
import { useSelector } from "react-redux";
import { connectionSelector } from "../../store/game/game.selector";
import { ActionsButton } from "../ActionsButton/ActionsButton";

const useStateSelectors = () => ({
  connection: useSelector(connectionSelector)
});

export const GameApp: React.FunctionComponent = () => {
  const { connection } = useStateSelectors();
  return (
    <div className={styles.game}>
      <Link />
      {connection ? (
        <div className={styles.content}>
          <LevelSelector />
          <Map />
          <ActionsButton />
        </div>
      ) : null}
    </div>
  );
};
