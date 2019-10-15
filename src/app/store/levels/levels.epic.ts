import {
  filter,
  ignoreElements,
  map,
  tap,
  withLatestFrom
} from "rxjs/operators";
import { RootAction } from "app/store/rootActions";
import { RootState } from "app/store/rootState";
import { Epic, combineEpics } from "redux-observable";
import { isActionOf } from "typesafe-actions";
import * as actions from "./levels.actions";
import { Services } from "app/services/rootServices";
import {
  loseStateSelector,
  passwordSelector,
  autoOpenSelector
} from "app/store/levels/levels.selector";
import { merge } from "rxjs";

export const getMapEpic: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  state$,
  { webSocketService }
) => {
  return action$.pipe(
    filter(isActionOf(actions.getGameMap)),
    tap(() => webSocketService.send(["map"])),
    ignoreElements()
  );
};

export const openItemEpic: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  state$,
  { webSocketService }
) => {
  return action$.pipe(
    filter(isActionOf(actions.openItem)),
    tap(({ payload: { x, y } }) => webSocketService.send([`open ${x} ${y}`])),
    ignoreElements()
  );
};

export const updateSolverMapEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { mineSweeperSolver }) => {
  return action$.pipe(
    filter(isActionOf(actions.setMap)),
    tap(({ payload }) => mineSweeperSolver.setMap(payload)),
    ignoreElements()
  );
};

export const autoOpenItemEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { webSocketService, mineSweeperSolver }) => {
  const openCell$ = action$.pipe(filter(isActionOf(actions.autoOpenItem)));
  const openMap$ = action$.pipe(filter(isActionOf(actions.autoOpenMap)));

  return merge(openCell$, openMap$).pipe(
    map(() => mineSweeperSolver.getPosition()),
    tap(positions => {
      webSocketService.send(positions.map(pos => `open ${pos.x} ${pos.y}`));
    }),
    ignoreElements()
  );
};

export const autoOpenMapEpic: Epic<
  RootAction,
  RootAction,
  RootState,
  Services
> = (action$, state$, { webSocketService, mineSweeperSolver }) => {
  const lose$ = state$.pipe(map(loseStateSelector));
  const win$ = state$.pipe(map(passwordSelector));
  const autoOpen$ = state$.pipe(map(autoOpenSelector));

  return action$.pipe(
    filter(isActionOf(actions.setMap)),
    withLatestFrom(autoOpen$, lose$, win$),
    filter(([_, autoOpen, lose, win]) => autoOpen && !lose && !win),
    map(() => mineSweeperSolver.getPosition()),
    tap(positions => {
      webSocketService.send(positions.map(pos => `open ${pos.x} ${pos.y}`));
    }),
    ignoreElements()
  );
};

export const levelsEpic = combineEpics(
  getMapEpic,
  openItemEpic,
  updateSolverMapEpic,
  autoOpenItemEpic,
  autoOpenMapEpic
);
