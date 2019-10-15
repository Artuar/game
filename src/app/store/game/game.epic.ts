import { filter, ignoreElements, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { RootAction } from 'app/store/rootActions';
import { RootState } from 'app/store/rootState';
import { Epic, combineEpics } from 'redux-observable';
import { isActionOf } from 'typesafe-actions';
import * as actions from './game.actions';
import { currentLevelSelector, currentLinkSelector } from 'app/store/game/game.selector';
import { webSocketService } from 'app/services/webSocketService';
import { MessageTypes } from 'app/store/game/game.constants';

export const connectEpic: Epic<RootAction, RootAction, RootState> = (
  action$, state$
) => {
  const currentLink$ = state$.pipe(map(currentLinkSelector));

  return action$.pipe(
    filter(isActionOf(actions.startGame)),
    withLatestFrom(currentLink$),
    mergeMap(([_, currentLink]) => webSocketService.open(currentLink).asObservable().pipe(
      map(({ type, message}): any => {
        switch (type) {
          case MessageTypes.Open:
            return actions.setConnectionState(true);
          case MessageTypes.Close:
            return actions.setConnectionState(false);
          case MessageTypes.Error:
            console.error(message);
            break;
          case MessageTypes.Message:
            if (message === 'new: OK') {
              return actions.getGameMap();
            }
            if (message && message.startsWith('map:')) {
              return actions.setMap(message.substr(5));
            }
            break;
          default:
        }
      }
    ))
  ));
};

export const startGameEpic: Epic<RootAction, RootAction, RootState> = (
  action$, state$
) => {
  const currentLevel$ = state$.pipe(map(currentLevelSelector));

  return action$.pipe(
    filter(isActionOf(actions.setConnectionState)),
    filter((action) => action.payload),
    withLatestFrom(currentLevel$),
    tap(([_, currentLevel]) => webSocketService.send(`new ${currentLevel}`)),
    ignoreElements())
};

export const getGameMapEpic: Epic<RootAction, RootAction, RootState> = (
  action$
) => {
  return action$.pipe(
    filter(isActionOf(actions.getGameMap)),
    tap(() => webSocketService.send('map')),
    ignoreElements())
};

export const gameEpic = combineEpics(
  connectEpic,
  startGameEpic,
  getGameMapEpic,
);

