import { combineEpics, Epic } from "redux-observable";
import { gameEpic } from "./game/game.epic";
import { levelsEpic } from "app/store/levels/levels.epic";

export const rootEpic: Epic = combineEpics(gameEpic, levelsEpic);
