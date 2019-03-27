import {EventEmitter, Injectable, Output} from '@angular/core';
import {Message} from './objects/Message';
import {AuthMessage} from './objects/AuthMessage';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private webSocket: WebSocket;

    @Output()
    connectionEmitter: EventEmitter<boolean> = new EventEmitter(true);

    @Output()
    messageEmitter: EventEmitter<Message> = new EventEmitter(true);

    constructor() {
    }

    connect(uri: string) {
        this.webSocket = new WebSocket(uri);
        this.webSocket.onopen = () => this.onOpen();
        this.webSocket.onclose = (ev) => this.onClose(ev);
        this.webSocket.onmessage = (ev) => this.onMessage(ev);
        this.webSocket.onerror = (ev) => this.onError(ev);
    }

    disconnect() {
        this.webSocket.close();
    }

    onOpen() {
        console.log('onopen');
        this.connectionEmitter.emit(true);
    }

    onClose(ev) {
        console.log('onclose' + ev);
        this.connectionEmitter.emit(false);
    }

    onMessage(ev) {
        console.log('onmessage');
        console.log('Received:' + ev.data);
        const message: Message = <Message>JSON.parse(ev.data);
        this.messageEmitter.emit(message);
    }

    onError(ev) {
        console.log('onerror' + ev);
        // this.connectionEmitter.emit(false);
    }

    send(message: Message) {
        let jsonString = JSON.stringify(message, (key, value) => {
            if (key === 'type') {
                value = undefined;
            }
            return value;
        });

        let type = '';
        if (message instanceof AuthMessage) {
            type = 'auth';
        }
        jsonString = '{ "' + type + '": ' + jsonString + ' }';
        console.log('Sent: ' + jsonString);
        this.webSocket.send(jsonString);
    }

}
