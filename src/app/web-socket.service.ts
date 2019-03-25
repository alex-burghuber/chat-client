import {EventEmitter, Injectable, Output} from '@angular/core';
import {Message} from './objects/Message';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private webSocket: WebSocket;

    @Output()
    messageEmitter: EventEmitter<Message> = new EventEmitter(true);

    @Output()
    connectionEmitter: EventEmitter<boolean> = new EventEmitter(true);

    constructor() {
        this.webSocket.onmessage = this.onmessage;
    }

    connectionHandler(uri: string) {
        this.webSocket = new WebSocket(uri);
        this.webSocket.onopen = () => {
            console.log('onopen');
            this.connectionEmitter.emit(true);
        };
        this.webSocket.onclose = () => {
            console.log('onclose');
            this.connectionEmitter.emit(false);
        };
        this.webSocket.onerror = (ev) => {
            console.log('onerror');
            // this.connectionEmitter.emit(false);
        };
    }

    onmessage(ev) {
        console.log('onmessage');
        const message: Message = JSON.parse(ev.data);
        console.log('Received: ' + message);
        this.messageEmitter.emit(message);
    }

    disconnect() {
        this.webSocket.close();
    }

    send(message: Message) {
        let jsonString = JSON.stringify(message, (key, value) => {
            if (key === 'type') {
                value = undefined;
            }
            return value;
        });
        jsonString = '{ "' + message.type + '": ' + jsonString + ' }';
        console.log('Sent: ' + jsonString);
        this.webSocket.send(jsonString);
    }

}
