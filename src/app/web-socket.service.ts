import {EventEmitter, Injectable, Output} from '@angular/core';
import {Message} from './objects/Message';
import {ChatMessage} from './objects/ChatMessage';
import {StatusMessage} from './objects/StatusMessage';

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

    messageHandler() {
        this.webSocket.onmessage = (ev) => {
            console.log('onmessage');
            const message: Message = JSON.parse(ev.data);
            switch (message.type) {
                case 'chat':
                    this.messageEmitter.emit(message as ChatMessage);
                    break;
                case 'status':
                    this.messageEmitter.emit(message as StatusMessage);
                    break;
                default:
                    console.log('Received a message that could not be interpreted\n' + message);
            }
        };
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
