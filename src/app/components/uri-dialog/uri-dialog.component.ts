import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../../interfaces/DialogData';

@Component({
    selector: 'app-uri-dialog',
    templateUrl: './uri-dialog.component.html',
    styleUrls: ['./uri-dialog.component.scss']
})
export class UriDialogComponent {
    error: boolean;

    constructor(
        public dialogRef: MatDialogRef<UriDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    closeTest() {
        this.dialogRef.close();
    }

    onConnect() {

    }
}
