import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    public webSocket: WebSocket;
    public uri = 'ws://localhost:8025/websockets/chat/';
    public username = '';
    public log = 'Opened log\n';

    constructor() {
    }

    connect() {
        this.webSocket = new WebSocket(this.uri);

        this.webSocket.onopen = (ev) => {
            this.log += 'Websocket connected\n';
        };
        this.webSocket.onmessage = (ev) => {
            this.log += ev.data + '\n';
        };
        this.webSocket.onerror = (ev) => {
            this.log += 'Error\n';
        };
        this.webSocket.onclose = (ev) => {
            this.log += 'Websocket closed\n';
        };

    }

}
