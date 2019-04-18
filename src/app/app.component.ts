import {Component, HostListener, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit {

    chats: Chat[] = [
        new Chat('Start', [
            new ChatMessage('chat', 'Sender', '', '', 0, 'This is an example message')
        ])
        /*
        new Chat('Peter', [
            new ChatMessage('chat', 'Peter', 'test', 'user', 1555581470, 'Hey!'),
            new ChatMessage('chat', 'Peter', 'test', 'user', 1555581475, 'How u doing?')
        ]),
        new Chat('Karl', [
            new ChatMessage('chat', 'Karl', 'test', 'user', 1555581480, 'yo!'),
            new ChatMessage('chat', 'Karl', 'test', 'user', 1555581485, 'wot up?')
        ])
        */
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

    ngOnInit(): void {
        this.wsService.chatEmitter.subscribe((chatMsg: ChatMessage) => {
            // get username of the client
            const username = sessionStorage.getItem('username');

            // check if the client is the sender or the receiver of the msg
            const chatContact = (chatMsg.sender === username ? chatMsg.receiver : chatMsg.sender);

            // find the correct chat where the msg belongs to
            let chat = this.chats.find(chatsElement => chatsElement.contact === chatContact);

            // if the msg hasn't been found, create a new one
            if (chat === undefined) {
                chat = new Chat(chatContact, []);
                this.chats.push(chat);
            }
            // add the msg to the chat
            chat.messages.push(<ChatMessage>chatMsg);

            // sort the chat msg by time sent
            chat.messages.sort((a, b) => {
                if (a.time >= b.time) {
                    return 1;
                } else if (a.time < b.time) {
                    return -1;
                }
            });
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

            // display snackbar
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
                const chat = new Chat(data.name, []);
                this.chats.push(chat);
                this.selectedChat = chat;
            }
        });
    }

}
