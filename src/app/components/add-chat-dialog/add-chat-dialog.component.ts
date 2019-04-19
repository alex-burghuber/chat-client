import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AddChatDialogData} from '../../interfaces/AddChatDialogData';

@Component({
    selector: 'app-add-chat-dialog',
    templateUrl: './add-chat-dialog.component.html',
    styleUrls: ['./add-chat-dialog.component.scss']
})
export class AddChatDialogComponent {

    constructor(public dialogRef: MatDialogRef<AddChatDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: AddChatDialogData) {
        this.data.name = '';
    }

    onEnter() {
        if (this.data.name !== '') {
            this.dialogRef.close(this.data);
        }
    }

    onCancel() {
        this.dialogRef.close();
    }

}
