import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    public webSocket: WebSocket;

    @Output()
    messageReceiver: EventEmitter<string> = new EventEmitter(true);

    @Output()
    connectionReceiver: EventEmitter<boolean> = new EventEmitter(true);

    constructor() {
    }

    connectHandler(uri: string, username: string) {

        this.webSocket = new WebSocket(uri);

        this.webSocket.onopen = () => {
            console.log('onopen');
            this.connectionReceiver.emit(true);
        };

        this.webSocket.onclose = () => {
            console.log('onclose');
            this.connectionReceiver.emit(false);
        };
    }

    messageHandler() {
        this.webSocket.onmessage = (ev) => {
            console.log('onmessage');
            this.messageReceiver.emit(ev.data + '\n');
        };
        this.webSocket.onerror = (ev) => {
            console.log('onerror');
            this.messageReceiver.emit('Error\n');
        };
    }
}
