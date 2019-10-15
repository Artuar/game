import { ActionType } from "typesafe-actions";
import * as gameActions from "./game/game.actions";
import * as levelsActions from "./levels/levels.actions";

export type GameAction = ActionType<typeof gameActions>;
export type LevelsAction = ActionType<typeof levelsActions>;

export type RootAction = GameAction | LevelsAction;
