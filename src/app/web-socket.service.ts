import {EventEmitter, Injectable, Output} from '@angular/core';
import {Message} from './objects/messages/Message';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private webSocket: WebSocket;

    @Output()
    connectionEmitter: EventEmitter<boolean> = new EventEmitter(true);

    @Output()
    messageEmitter: EventEmitter<Message> = new EventEmitter(true);

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
        this.messageEmitter.emit(<Message>JSON.parse(ev.data));
    }

    onError(ev) {
        console.log('onerror' + ev);
        // this.connectionEmitter.emit(false);
    }

    send(message: Message) {
        const jsonStr = JSON.stringify(message);
        console.log('Sent: ' + jsonStr);
        this.webSocket.send(jsonStr);
    }

}
