import {Component, HostListener} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthDialogComponent} from './components/auth-dialog/auth-dialog.component';
import {WebSocketService} from './web-socket.service';
import {AddChatDialogComponent} from './components/add-chat-dialog/add-chat-dialog.component';
import {Chat} from './objects/Chat';
import {ChatMessage} from './objects/messages/ChatMessage';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    chats: Chat[] = [
        new Chat('Peter', [
            new ChatMessage('chat', 'test', 'Peter', 'Hey!'),
            new ChatMessage('chat', 'test', 'Peter', 'How u doing?')
        ]),
        new Chat('Karl', [
            new ChatMessage('chat', 'test', 'Karl', 'yo!'),
            new ChatMessage('chat', 'test', 'Karl', 'wot up?')
        ])
    ];

    selectedChat = this.chats[0];
    sideNavMode = 'side';
    sideNavWidth = '15%';
    sidenavOpened = true;

    constructor(private wsService: WebSocketService,
                private router: Router,
                private dialog: MatDialog,
                private snackBar: MatSnackBar) {
        // open the authentication dialog
        this.openAuthDialog();
        // initial responsive render of the sidenav
        this.resizeHandler(true);
    }

    /**
     * Window width event handler for sidenav responsiveness.
     * @param initial indicates if the method is called from the constructor
     */
    @HostListener('window:resize')
    resizeHandler(initial: boolean) {
        if (window.innerWidth >= 992) {
            this.sideNavMode = 'side';
            this.sideNavWidth = '15%';
        } else {
            if (window.innerWidth >= 576) {
                this.sideNavMode = 'over';
                this.sideNavWidth = '30%';
            } else {
                this.sideNavMode = 'over';
                this.sideNavWidth = '55%';
            }
            if (initial) {
                // initially close the sidenav if the window width is small. By default the sidenav is opened
                this.sidenavOpened = false;
            }
        }
    }

    openAuthDialog() {
        this.dialog.closeAll();
        const authDialogRef = this.dialog.open(AuthDialogComponent, {
            minWidth: '40%',
            disableClose: true,
            data: {}
        });
        authDialogRef.afterClosed().subscribe(data => {
            // save the data for auto reconnect + login on reload
            sessionStorage.setItem('uri', data.uri);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('password', data.password);

            const snackBarMessage = 'Connected to ' + data.uri + ' as ' + data.username;
            this.snackBar.open(snackBarMessage, 'Nice', {
                duration: 2000
            });
        });
    }

    onAddChat() {
        const addChatDialogRef = this.dialog.open(AddChatDialogComponent, {
            data: {}
        });
        addChatDialogRef.afterClosed().subscribe(data => {
            if (data !== undefined) {
                const chat = new Chat(data.name);
                this.chats.push(chat);
                this.selectedChat = chat;
            }
        });
    }

}
