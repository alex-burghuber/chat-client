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
        this.wsService.connectionEmitter.subscribe(isConnected => {
            this.isConnected = isConnected;
            this.isConnecting = false;
            console.log(isConnected ? 'connected' : 'connection failed');
        });
        this.wsService.messageEmitter.subscribe(message => {
            if (message.type === 'status') {
                if (message.kind === 'register') {
                    this.registerStatus = message.content;
                    console.log(message.isSuccess ? 'Success' : 'Error');
                } else if (message.kind === 'login') {
                    this.loginStatus = message.content;
                    if (message.isSuccess === true) {
                        this.data.username = this.username;
                    }
                    console.log(message.isSuccess ? 'Success' : 'Error');
                    this.dialogRef.close(this.data);
                }
            }
        });
    }

    onConnect() {
        if (!this.isConnected) {
            this.isConnecting = true;
            this.hasTriedToConnect = true;
            this.wsService.connect(this.data.uri);
        } else {
            this.wsService.disconnect();
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
        const authMessage = new AuthMessage('auth', 'login', this.username, this.password);
        this.wsService.send(authMessage);
    }

}
