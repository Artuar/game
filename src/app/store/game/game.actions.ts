import { createStandardAction } from "typesafe-actions";

export const changeLink = createStandardAction("@game/CHANGE_LINK")<string>();

export const startGame = createStandardAction("@game/START_GAME")();

export const finishGame = createStandardAction("@game/FINISH_GAME")();

export const setError = createStandardAction("@game/SET_ERROR")<string>();

export const setConnectionState = createStandardAction("@game/SET_CONNECTION")<
  boolean
>();
