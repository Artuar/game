import { createStandardAction } from 'typesafe-actions';

export const changeLink = createStandardAction('@game/CHANGE_LINK')<string>();

export const startGame = createStandardAction('@game/START_GAME')();

export const finishGame = createStandardAction('@game/FINISH_GAME')();

export const setConnectionState = createStandardAction('@game/SET_CONNECTION')<boolean>();

export const getGameMap = createStandardAction('@game/GET_GAME_MAP')();

export const chooseLevel = createStandardAction('@game/CHOOSE_LEVEL')<number>();

export const setMap = createStandardAction('@game/SET_MAP')<string>();

export const setLosing = createStandardAction('@game/SET_LOOSING')();
