import {Component, Input} from '@angular/core';
import {Chat} from '../../objects/Chat';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

    inputMessage = '';
    @Input() chat: Chat;

    constructor() {
    }

}
