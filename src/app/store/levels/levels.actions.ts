import { createStandardAction } from "typesafe-actions";
import { ItemPosition, LevelMap } from "app/store/levels/levels.types";

export const getGameMap = createStandardAction("@levels/GET_GAME_MAP")();

export const openItem = createStandardAction("@levels/OPEN_ITEM")<
  ItemPosition
>();

export const changeLevel = createStandardAction("@levels/CHANGE_LEVEL")<
  number
>();

export const setMap = createStandardAction("@levels/SET_MAP")<LevelMap>();

export const setLosing = createStandardAction("@levels/SET_LOOSING")();

export const setPassword = createStandardAction("@levels/SET_PASSWORD")<
  string
>();

export const autoOpenItem = createStandardAction("@levels/AUTO_OPEN_ITEM")();

export const autoOpenMap = createStandardAction("@levels/AUTO_OPEN_Map")();
