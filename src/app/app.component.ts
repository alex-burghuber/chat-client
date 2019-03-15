import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UriDialogComponent} from './components/uri-dialog/uri-dialog.component';
import {WebSocketService} from './web-socket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    defaultUri = 'ws://localhost:8025/websockets/chat/';
    log = '';
    inputMessage = '';

    constructor(private webSocketService: WebSocketService, private router: Router, public dialog: MatDialog) {
        this.openDialog();
    }

    openDialog() {
        const dialogRef = this.dialog.open(UriDialogComponent, {
            width: '500px',
            data: {uri: this.defaultUri}
        });

        dialogRef.afterClosed().subscribe(data => {
            // this.webSocketService.connect(data.uri, data.username);
            this.messageReceiver();
        });
    }

    messageReceiver() {
        this.webSocketService.messageHandler();
        this.webSocketService.messageReceiver.subscribe(data => {
            this.log += data;
        });
    }

    /*
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
    */
}
