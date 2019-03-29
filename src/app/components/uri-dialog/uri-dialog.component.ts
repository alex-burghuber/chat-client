import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../../interfaces/DialogData';
import {WebSocketService} from '../../web-socket.service';
import {AuthMessage} from '../../objects/AuthMessage';

@Component({
    selector: 'app-uri-dialog',
    templateUrl: './uri-dialog.component.html',
    styleUrls: ['./uri-dialog.component.scss']
})
export class UriDialogComponent implements OnInit {

    // response fields
    loginStatus: string;
    registerStatus: string;

    // form fields
    uri = 'ws://localhost:8025/websockets/chat';
    username = '';
    password = '';
    repeatPassword = '';

    // UX fields
    isLoading = false;
    isConnected = false;
    hasTriedToConnect = false;
    passwordsUnequal: boolean;

    matTabIndex: number;
    isReloadConnect: boolean;

    constructor(public dialogRef: MatDialogRef<UriDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData,
                public wsService: WebSocketService) {
        // reconnect if the page was reloaded
        const uri = localStorage.getItem('uri');
        if (uri !== null) {
            this.uri = uri;
            this.isReloadConnect = true;
            this.onConnect();
        }
    }

    ngOnInit(): void {
        this.wsService.connectionEmitter.subscribe(isConnected => {
            console.log(isConnected ? 'connected' : 'connection failed');
            if (this.isReloadConnect && isConnected) {
                // re login if the page was reloaded
                const username = localStorage.getItem('username');
                const password = localStorage.getItem('password');
                if (username !== null && password !== null) {
                    this.username = username;
                    this.password = password;
                    this.onLogin();
                }
            } else {
                // connection attempt failed
                this.isConnected = isConnected;
                this.isLoading = false;
            }
        });
        this.wsService.messageEmitter.subscribe(message => {
            console.log(message.type + ' message: ' + (message.success ? 'Success' : 'Error'));
            if (message.type === 'status') {
                if (message.kind === 'register') {
                    this.isLoading = false;
                    this.registerStatus = message.content;
                    if (message.success === true) {
                        setTimeout(() => {
                            this.matTabIndex = 1;
                        }, 1000);
                    }
                } else if (message.kind === 'login') {
                    this.loginStatus = message.content;
                    if (message.success === true) {
                        this.data.uri = this.uri;
                        this.data.username = this.username;
                        this.data.password = this.password;
                        setTimeout(() => {
                            this.dialogRef.close(this.data);
                        }, 1000);
                    } else if (this.isReloadConnect) {
                        this.isReloadConnect = false;
                        localStorage.clear();
                    }
                }
            }
        });
    }

    onConnect() {
        if (!this.isConnected) {
            this.isLoading = true;
            this.hasTriedToConnect = true;
            this.wsService.connect(this.uri);
        } else {
            this.wsService.disconnect();
        }
    }

    onRegister() {
        if (this.username !== '' && this.password !== '' && this.repeatPassword !== '') {
            if (this.password === this.repeatPassword) {
                this.passwordsUnequal = false;
                this.isLoading = true;
                const authMessage = new AuthMessage('auth', 'register', this.username, this.password);
                this.wsService.send(authMessage);
            } else {
                this.passwordsUnequal = true;
            }
        }
    }

    onLogin() {
        if (this.username !== '' && this.password !== '') {
            const authMessage = new AuthMessage('auth', 'login', this.username, this.password);
            this.wsService.send(authMessage);
        }
    }

}
