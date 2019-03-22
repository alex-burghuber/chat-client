import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../../interfaces/DialogData';
import {WebSocketService} from '../../web-socket.service';
import {StatusMessage} from '../objects/StatusMessage';

@Component({
    selector: 'app-uri-dialog',
    templateUrl: './uri-dialog.component.html',
    styleUrls: ['./uri-dialog.component.scss']
})
export class UriDialogComponent implements OnInit {

    buttonClicked = false;
    connectionFailed = false;
    isConnected = false;
    username: string;
    password: string;
    repeatPassword: string;
    loginStatus: string;
    registerStatus: string;
    matTabIndex: number;

    constructor(public dialogRef: MatDialogRef<UriDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData,
                public webSocketService: WebSocketService) {
    }

    ngOnInit(): void {
        this.webSocketService.connectionEmitter.subscribe(result => {
            if (result) {
                console.log('connected');
                this.isConnected = true;
            } else {
                console.log('connection failed');
                this.connectionFailed = true;
            }
            this.buttonClicked = false;
        });
        this.webSocketService.messageEmitter.subscribe(message => {
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
        this.buttonClicked = true;
        this.webSocketService.connectHandler(this.data.uri);
    }

    onRegister() {
        // TODO: Validation
        const jsonString = '{ "auth": { "action": "register", "username": "' + this.username + '", "password": "' + this.password + '"} }';
        this.webSocketService.send(jsonString);
    }

    onLogin() {
        // TODO: Validation
        const jsonString = '{ "auth": { "action": "login", "username": "' + this.username + '", "password": "' + this.password + '"} }';
        this.webSocketService.send(jsonString);
        this.dialogRef.close(this.data);
    }

}
