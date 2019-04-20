import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AuthDialogComponent} from './components/auth-dialog/auth-dialog.component';
import {WebSocketService} from './web-socket.service';
import {AddChatDialogComponent} from './components/add-chat-dialog/add-chat-dialog.component';
import {Chat} from './objects/Chat';
import {ChatMessage} from './objects/messages/ChatMessage';
import {StatusMessage} from './objects/messages/StatusMessage';
import {AddChatDialogData} from './interfaces/AddChatDialogData';
import {GroupMessage} from './objects/messages/GroupMessage';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    chats: Chat[] = [
        new Chat('Start', 'user', [
            new ChatMessage('chat', 'Sender', '', '', 0, 'This is an example message')
        ])
    ];

    selectedChat = this.chats[0];
    sideNavMode = 'side';
    sideNavWidth = '15%';
    sidenavOpened = true;

    constructor(public wsService: WebSocketService,
                private router: Router,
                private dialog: MatDialog,
                private snackBar: MatSnackBar) {
        // open the authentication dialog
        this.openAuthDialog('Hello there!');
        // initial responsive render of the sidenav
        this.resizeHandler(true);
    }

    ngOnInit(): void {
        this.wsService.chatEmitter.subscribe((chatMsg: ChatMessage) => {
            // get username of the client
            const username = sessionStorage.getItem('username');

            // get the chat contact
            let chatContact = chatMsg.receiver;
            if (chatMsg.kind === 'user') {
                // check if the client is the sender or the receiver of the msg
                chatContact = (chatMsg.sender === username ? chatMsg.receiver : chatMsg.sender);
            }

            // find the correct chat where the msg belongs to
            let chat = this.chats.find(chatsElement => chatsElement.contact === chatContact && chatsElement.kind === chatMsg.kind);

            // if the msg hasn't been found, create a new one
            if (chat === undefined) {
                chat = new Chat(chatContact, chatMsg.kind, []);
                this.chats.push(chat);
            }

            // add the msg to the chat
            chat.messages.push(<ChatMessage>chatMsg);

            // sort the chat messages by time sent
            chat.messages.sort((a, b) => {
                if (a.time >= b.time) {
                    return 1;
                } else if (a.time < b.time) {
                    return -1;
                }
            });

        });
        this.wsService.statusEmitter.subscribe((statusMsg: StatusMessage) => {
            if (statusMsg.kind === 'chat') {
                this.snackBar.open(statusMsg.content, 'Ok', {
                    duration: 4000
                });
            }
        });
        this.wsService.connectionEmitter.subscribe(isConnected => {
            if (!isConnected) {
                if (this.dialog.getDialogById('auth') === undefined) {
                    this.openAuthDialog('Connection lost');
                }
            }
        });
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

    openAuthDialog(title: string) {
        this.dialog.closeAll();
        const authDialogRef = this.dialog.open(AuthDialogComponent, {
            minWidth: '30%',
            maxWidth: '90%',
            disableClose: true,
            data: {title: title},
            id: 'auth'
        });
        authDialogRef.afterClosed().subscribe(data => {
            // save the data for auto reconnect + login on reload
            sessionStorage.setItem('uri', data.uri);
            sessionStorage.setItem('username', data.username);
            sessionStorage.setItem('password', data.password);

            // display snackbar
            const message = 'Connected to ' + data.uri + ' as ' + data.username;
            this.snackBar.open(message, 'Nice', {
                duration: 2000
            });
        });
    }

    onAddChat() {
        const addChatDialogRef = this.dialog.open(AddChatDialogComponent, {
            data: {}
        });
        addChatDialogRef.afterClosed().subscribe((data: AddChatDialogData) => {
            if (data !== undefined) {
                console.log('Adding chat: ' + data.name + ',' + data.kind);
                const chat = new Chat(data.name, data.kind, []);
                this.chats.push(chat);
                this.selectedChat = chat;
                if (data.kind === 'group') {
                    const groupMsg = new GroupMessage('group', data.name);
                    this.wsService.send(groupMsg);
                }
            }
        });
    }

    onDisconnect() {
        // disconnect from the websocket
        this.wsService.disconnect();
        // reset chat view
        this.chats = [
            new Chat('Start', 'user',
                [new ChatMessage('chat', 'Sender', '', '', 0, 'This is an example message')
                ])
        ];
        this.selectedChat = this.chats[0];
    }
}
