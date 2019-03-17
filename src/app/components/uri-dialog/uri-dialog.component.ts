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
    username: string;
    password: string;
    repeatPassword: string;
    isConnected = false;
    tabGroupIndex = 0;

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
    }

    connect() {
        this.buttonWasClicked = true;
        this.webSocketService.connectHandler(this.data.uri, this.data.username);
    }

    onLogin() {
    }

    onRegister() {
    }
}
