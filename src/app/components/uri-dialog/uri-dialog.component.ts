import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../../interfaces/DialogData';
import {WebSocketService} from '../../web-socket.service';

@Component({
    selector: 'app-uri-dialog',
    templateUrl: './uri-dialog.component.html',
    styleUrls: ['./uri-dialog.component.scss']
})
export class UriDialogComponent {

    constructor(public dialogRef: MatDialogRef<UriDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData,
                public webSocketService: WebSocketService) {
    }

    connect() {
        const result = this.webSocketService.connect(this.data.uri, this.data.username);
        if (result === true) {
            console.log('connected');
            this.dialogRef.close(this.data);
        } else {
            console.log('no connection');
        }
    }

}
