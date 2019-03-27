import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UriDialogComponent} from './components/uri-dialog/uri-dialog.component';
import {WebSocketService} from './web-socket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    defaultUri = 'ws://localhost:8025/websockets/chat';
    log = '';
    inputMessage = '';

    constructor(private webSocketService: WebSocketService, private router: Router,
                private dialog: MatDialog, private snackBar: MatSnackBar) {
        this.openDialog();
    }

    messageReceiver() {
        this.webSocketService.messageEmitter.subscribe(data => {
            this.log += data;
        });
    }

    openDialog() {
        this.dialog.closeAll();
        const dialogRef = this.dialog.open(UriDialogComponent, {
            width: '700px',
            disableClose: true,
            data: {uri: this.defaultUri}
        });
        dialogRef.afterClosed().subscribe(data => {
            const snackBarMessage = 'Connected to ' + data.uri + ' as ' + data.username;
            this.snackBar.open(snackBarMessage, 'Nice', {
                duration: 4000,
            });
        });
    }

    onSubmit() {

    }

}
