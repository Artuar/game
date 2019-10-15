import { Subject } from 'rxjs';
import { MessageTypes } from 'app/store/game/game.constants';

export interface Interface {
  type: string,
  message?: string,
}

export class WebSocketService {
  private socket: WebSocket | undefined;

  open(url: string) {
    const subject = new Subject<Interface>();

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      subject.next({ type: MessageTypes.Open });
    };

    this.socket.onmessage = ({ data }) => {
      subject.next({ type: MessageTypes.Message, message: data});
    };

    this.socket.onclose = () => {
      subject.next({ type: MessageTypes.Close});
    };

    this.socket.onerror = ({ type }) => {
      subject.next({ type: MessageTypes.Error, message: type});
    };

    return subject;
  }

  send(message: string) {
    if (!this.socket) {
      throw new Error('Socket is closed');
    }
    this.socket.send(message);
  }

  close() {
    this.socket && this.socket.close();
  }
}

export const webSocketService = new WebSocketService();
