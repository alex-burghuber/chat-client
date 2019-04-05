import {Component, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material';

@Component({
    selector: 'app-new-chat-bottom-sheet',
    templateUrl: './new-chat-bottom-sheet.component.html',
    styleUrls: ['./new-chat-bottom-sheet.component.scss']
})
export class NewChatBottomSheetComponent implements OnInit {

    constructor(private bottomSheetRef: MatBottomSheetRef<NewChatBottomSheetComponent>) {
    }

    ngOnInit() {
    }

}
