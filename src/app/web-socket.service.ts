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

    connectHandler(uri: string) {
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
            const json = JSON.parse(ev.data);
            this.messageReceiver.emit(json);
        };
        this.webSocket.onerror = (ev) => {
            console.log('onerror');
            this.messageReceiver.emit('Error\n');
        };
    }

    sendMessage(data: string) {
        console.log(data);
        this.webSocket.send(data);
    }
}
