import {
  filter,
  ignoreElements,
  map,
  mergeMap,
  tap,
  withLatestFrom
} from "rxjs/operators";
import { merge } from "rxjs";
import { RootAction } from "app/store/rootActions";
import { RootState } from "app/store/rootState";
import { Epic, combineEpics } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import * as gameActions from "./game.actions";
import * as levelsActions from "../levels/levels.actions";
import { currentLinkSelector } from "app/store/game/game.selector";
import { MessageTypes } from "app/store/game/game.constants";
import { Services } from "app/services/rootServices";
import { currentLevelSelector } from "app/store/levels/levels.selector";

export const connectEpic: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  state$,
  { webSocketService }
) => {
  const currentLink$ = state$.pipe(map(currentLinkSelector));

  return action$.pipe(
    filter(isActionOf(gameActions.startGame)),
    withLatestFrom(currentLink$),
    mergeMap(([_, currentLink]) => {
      return webSocketService
        .open(currentLink)
        .asObservable()
        .pipe(
          map(
            ({ type, message }): RootAction => {
              switch (type) {
                case MessageTypes.Open:
                  return gameActions.setConnectionState(true);
                case MessageTypes.Close:
                  return gameActions.setConnectionState(false);
                case MessageTypes.Error:
                  return gameActions.setError(`Error: ${message}`);
                case MessageTypes.Message:
                  if (message === "new: OK" || message === "open: OK") {
                    return levelsActions.getGameMap();
                  }
                  if (message === "open: You lose") {
                    return levelsActions.setLosing();
                  }
                  if (message && message.startsWith("open: You win. ")) {
                    return levelsActions.setPassword(message.substr(15));
                  }
                  if (message && message.startsWith("map:")) {
                    return levelsActions.setMap(
                      message
                        .substr(5)
                        .split("\n")
                        .map(row => row.split(""))
                    );
                  }
                  return gameActions.setError(`Error: unexpected message`);
                default:
                  return gameActions.setError(`Error: unexpected message`);
              }
            }
          )
        );
    })
  );
};

export const startGameEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { webSocketService }) => {
  const setConnection$ = action$.pipe(
    filter(isActionOf(gameActions.setConnectionState)),
    filter(action => action.payload)
  );

  const changeLevel$ = action$.pipe(
    filter(isActionOf(levelsActions.changeLevel))
  );

  const currentLevel$ = state$.pipe(map(currentLevelSelector));

  return merge(setConnection$, changeLevel$).pipe(
    withLatestFrom(currentLevel$),
    tap(([_, currentLevel]) => webSocketService.send([`new ${currentLevel}`])),
    ignoreElements()
  );
};

export const finishGameEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { webSocketService }) => {
  return action$.pipe(
    filter(isActionOf(gameActions.finishGame)),
    tap(() => webSocketService.close()),
    ignoreElements()
  );
};

export const gameEpic = combineEpics(
  connectEpic,
  startGameEpic,
  finishGameEpic
);
