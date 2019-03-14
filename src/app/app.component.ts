import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UriDialogComponent} from './components/uri-dialog/uri-dialog.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    private webSocket: WebSocket;
    uri = 'ws://localhost:8025/websockets/chat/User1';
    username = '';
    log = 'Opened log\n';
    inputMessage = '';

    constructor(private router: Router, public dialog: MatDialog) {
        this.openDialog();
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(UriDialogComponent, {
            width: '250px',
            data: {uri: this.uri, username: this.username}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
        });
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
