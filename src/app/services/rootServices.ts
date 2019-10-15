import { WebSocketService, webSocketService } from 'app/services/webSocketService';

export interface Services {
  webSocketService: WebSocketService;
}

export const services: Services = {
  webSocketService,
};
