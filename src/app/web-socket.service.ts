import {EventEmitter, Injectable, Output} from '@angular/core';
import {Message} from './components/objects/Message';
import {ChatMessage} from './components/objects/ChatMessage';
import {StatusMessage} from './components/objects/StatusMessage';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    public webSocket: WebSocket;

    @Output()
    messageEmitter: EventEmitter<Message> = new EventEmitter(true);

    @Output()
    connectionEmitter: EventEmitter<boolean> = new EventEmitter(true);

    constructor() {
    }

    connectHandler(uri: string) {
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
            this.connectionEmitter.emit(false);
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

    send(data: string) {
        console.log(data);
        this.webSocket.send(data);
    }
}
