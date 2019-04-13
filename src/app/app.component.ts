import {Component} from '@angular/core';
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

    constructor(private wsService: WebSocketService,
                private router: Router,
                private dialog: MatDialog,
                private snackBar: MatSnackBar) {
        this.openDialog();
    }

    openDialog() {
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
                duration: 6000
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
                this.onOpenChat(chat);
            }
        });
    }

    onOpenChat(chat: Chat) {
        this.selectedChat = chat;
    }
}
