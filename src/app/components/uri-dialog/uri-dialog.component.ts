import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../../interfaces/DialogData';
import {WebSocketService} from '../../web-socket.service';
import {StatusMessage} from '../../objects/StatusMessage';
import {AuthMessage} from '../../objects/AuthMessage';

@Component({
    selector: 'app-uri-dialog',
    templateUrl: './uri-dialog.component.html',
    styleUrls: ['./uri-dialog.component.scss']
})
export class UriDialogComponent implements OnInit {

    loginStatus: string;
    registerStatus: string;
    matTabIndex: number;

    // Form fields
    username: string;
    password: string;
    repeatPassword: string;

    // UX fields
    isConnecting = false;
    isConnected = false;
    hasTriedToConnect = false;
    passwordsUnequal: boolean;

    constructor(public dialogRef: MatDialogRef<UriDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData,
                public wsService: WebSocketService) {
    }

    ngOnInit(): void {
        this.wsService.connectionEmitter.subscribe(wsIsConnected => {
            this.isConnected = wsIsConnected;
            this.isConnecting = false;
            console.log(wsIsConnected ? 'connected' : 'connection failed');
        });
        this.wsService.messageEmitter.subscribe(message => {
            if (message instanceof StatusMessage) {
                if (message.kind === 'register') {
                    if (message.isSuccess) {
                        this.registerStatus = 'Successfully registered';
                        this.matTabIndex = 0;
                    } else {
                        this.loginStatus = message.content;
                    }
                } else if (message.kind === 'login') {
                    if (message.isSuccess) {
                        this.loginStatus = 'Successfully logged in';
                        // TODO: Redirect
                    } else {
                        this.loginStatus = message.content;
                    }
                }
            }
        });
    }

    onConnect() {
        if (this.isConnected) {
            this.wsService.disconnect();
        } else {
            this.isConnecting = true;
            this.hasTriedToConnect = true;
            this.wsService.connectionHandler(this.data.uri);
        }
    }

    onRegister() {
        if (this.password === this.repeatPassword) {
            this.passwordsUnequal = false;
            const authMessage = new AuthMessage('auth', 'register', this.username, this.password);
            this.wsService.send(authMessage);
        } else {
            this.passwordsUnequal = true;
        }
    }

    onLogin() {
    }

}
