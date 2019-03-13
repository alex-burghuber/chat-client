import {Component, OnInit} from '@angular/core';


@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    private webSocket: WebSocket;
    uri = 'ws://localhost:8025/websockets/chat/User1';
    log = 'Opened log\n';
    inputMessage = '';

    constructor() {
    }

    ngOnInit(): void {

    }

    onConnect() {
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

    onSubmit() {
        if (this.webSocket != null) {
            this.webSocket.send(this.inputMessage);
        }
    }

}
