import { ActionType } from 'typesafe-actions';
import * as gameActions from './game/game.actions';

export type GameAction = ActionType<typeof gameActions>;

export type RootAction = GameAction;
