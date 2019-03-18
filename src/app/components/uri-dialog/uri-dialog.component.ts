import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../../interfaces/DialogData';
import {WebSocketService} from '../../web-socket.service';

@Component({
    selector: 'app-uri-dialog',
    templateUrl: './uri-dialog.component.html',
    styleUrls: ['./uri-dialog.component.scss']
})
export class UriDialogComponent implements OnInit {

    buttonWasClicked = false;
    connectionFailed = false;
    isConnected = false;
    tabGroupIndex = 0;
    username: string;
    password: string;
    repeatPassword: string;

    constructor(public dialogRef: MatDialogRef<UriDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData,
                public webSocketService: WebSocketService) {
    }

    ngOnInit(): void {
        this.webSocketService.connectionReceiver.subscribe(result => {
            if (result) {
                console.log('connected');
                this.isConnected = true;
            } else {
                console.log('connection failed');
                this.connectionFailed = true;
            }
            this.buttonWasClicked = false;
        });
        this.webSocketService.messageReceiver.subscribe(data => {


        });
    }

    onConnect() {
        this.buttonWasClicked = true;
        this.webSocketService.connectHandler(this.data.uri);
    }

    onRegister() {
        // TODO: Validation
        const jsonString = '{ "auth": { "action": "register", "username": "' + this.username + '", "password": "' + this.password + '"} }';
        this.webSocketService.sendMessage(jsonString);
    }

    onLogin() {
        // TODO: Validation
        const jsonString = '{ "auth": { "action": "login", "username": "' + this.username + '", "password": "' + this.password + '"} }';
        this.webSocketService.sendMessage(jsonString);
        this.dialogRef.close(this.data);
    }

}
