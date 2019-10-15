import {
  WebSocketService,
  webSocketService
} from "app/services/webSocketService";
import {
  mineSweeperSolver,
  MineSweeperSolver
} from "app/services/minesSweeperSolver";

export interface Services {
  webSocketService: WebSocketService;
  mineSweeperSolver: MineSweeperSolver;
}

export const services: Services = {
  webSocketService,
  mineSweeperSolver
};
