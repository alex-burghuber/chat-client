import {EventEmitter, Injectable, Output} from '@angular/core';
import {Message} from './objects/messages/Message';
import {ChatMessage} from './objects/messages/ChatMessage';
import {StatusMessage} from './objects/messages/StatusMessage';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private webSocket: WebSocket;

    @Output()
    connectionEmitter: EventEmitter<boolean> = new EventEmitter(true);

    @Output()
    chatEmitter: EventEmitter<ChatMessage> = new EventEmitter(true);

    @Output()
    statusEmitter: EventEmitter<StatusMessage> = new EventEmitter(true);

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
        console.log('Received: ' + ev.data);

        const message = <Message>JSON.parse(ev.data);

        if (message.type === 'chat') {
            this.chatEmitter.emit(<ChatMessage>message);
        } else if (message.type === 'status') {
            this.statusEmitter.emit(<StatusMessage>message);
        } else {
            console.error('Could not interpret message');
        }
    }

    onError(ev) {
        console.log('onerror');
        console.error(ev);
        // this.connectionEmitter.emit(false);
    }

    send(message: Message) {
        const jsonStr = JSON.stringify(message);
        console.log('Sent: ' + jsonStr);
        this.webSocket.send(jsonStr);
    }

}
