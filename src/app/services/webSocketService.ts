import { Subject } from "rxjs";
import { MessageTypes } from "app/store/game/game.constants";

export interface Interface {
  type: string;
  message?: string;
}

export class WebSocketService {
  private socket: WebSocket | undefined;
  private locked = 0;

  open(url: string) {
    const subject = new Subject<Interface>();

    try {
      this.socket = new WebSocket(url);
    } catch (e) {
      subject.next({ type: MessageTypes.Error, message: "Connection error!" });
      return subject;
    }

    this.socket.onopen = () => {
      subject.next({ type: MessageTypes.Open });
    };

    this.socket.onmessage = ({ data }) => {
      this.locked--;
      if (this.locked === 0) {
        subject.next({ type: MessageTypes.Message, message: data });
      }
    };

    this.socket.onclose = () => {
      subject.next({ type: MessageTypes.Close });
    };

    this.socket.onerror = ({ type }) => {
      subject.next({ type: MessageTypes.Error, message: type });
    };

    return subject;
  }

  send(messages: string[]) {
    this.locked = messages.length;
    messages.forEach((message, i) => {
      if (!this.socket) {
        throw new Error("Socket is closed");
      }
      this.socket.send(message);
    });
  }

  close() {
    this.socket && this.socket.close();
  }
}

export const webSocketService = new WebSocketService();
