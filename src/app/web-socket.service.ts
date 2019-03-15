import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    public webSocket: WebSocket;

    @Output()
    messageReceiver: EventEmitter<string> = new EventEmitter(true);

    constructor() {
    }

    connect(uri: string, username: string): boolean {
        let connectionUri: string;
        if (uri.endsWith('/')) {
            connectionUri = uri + username;
        } else {
            connectionUri = uri + '/' + username;
        }

        this.webSocket = new WebSocket(connectionUri);

        if (this.webSocket.readyState === 1) {
            return true;
        } else {
            return false;
        }
    }

    messageHandler() {
        this.webSocket.onopen = (ev) => {
            console.log('onopen');
            this.messageReceiver.emit('Websocket connected\n');
        };
        this.webSocket.onmessage = (ev) => {
            console.log('onmessage');
            this.messageReceiver.emit(ev.data + '\n');
        };
        this.webSocket.onerror = (ev) => {
            console.log('onerror');
            this.messageReceiver.emit('Error\n');
        };
        this.webSocket.onclose = (ev) => {
            console.log('onclose');
            this.messageReceiver.emit('Websocket closed\n');
        };
    }
}
