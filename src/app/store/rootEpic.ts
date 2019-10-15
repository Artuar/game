import { combineEpics, Epic } from 'redux-observable';
import { gameEpic } from './game/game.epic';

export const rootEpic: Epic = combineEpics(
  gameEpic,
);
