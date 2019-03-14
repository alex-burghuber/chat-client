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

    // private webSocket: WebSocket;
    // uri = 'ws://localhost:8025/websockets/chat/';
    // username = '';
    // log = 'Opened log\n';
    inputMessage = '';

    constructor(private webSocketService: WebSocketService, private router: Router, public dialog: MatDialog) {
        this.openDialog();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(UriDialogComponent, {
            width: '500px',
            data: {uri: this.webSocketService.uri, username: this.webSocketService.username}
        });

        dialogRef.afterClosed().subscribe(data => {
            this.webSocketService.uri = data.uri;
            this.webSocketService.username = data.username;
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
