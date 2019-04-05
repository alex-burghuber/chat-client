import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatBottomSheet, MatDialog, MatSnackBar} from '@angular/material';
import {UriDialogComponent} from './components/uri-dialog/uri-dialog.component';
import {WebSocketService} from './web-socket.service';
import {NewChatBottomSheetComponent} from './components/new-chat-bottom-sheet/new-chat-bottom-sheet.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    log = '';
    inputMessage = '';

    constructor(private wsService: WebSocketService,
                private router: Router,
                private dialog: MatDialog,
                private snackBar: MatSnackBar,
                private bottomSheet: MatBottomSheet) {
        this.openDialog();
    }

    openDialog() {
        this.dialog.closeAll();
        const dialogRef = this.dialog.open(UriDialogComponent, {
            minWidth: '40%',
            disableClose: true,
            data: {}
        });
        dialogRef.afterClosed().subscribe(data => {
            // save the data for auto reconnect + login on reload
            localStorage.setItem('uri', data.uri);
            localStorage.setItem('username', data.username);
            localStorage.setItem('password', data.password);
            const snackBarMessage = 'Connected to ' + data.uri + ' as ' + data.username;
            this.snackBar.open(snackBarMessage, 'Nice', {
                duration: 6000
            });
        });
    }

    onSubmit() {
    }

    onNewChat() {
        const bottomSheetRef = this.bottomSheet.open(NewChatBottomSheetComponent, {
            data: {}
        });
    }
}
