import {Component, Input} from '@angular/core';
import {Chat} from '../../objects/Chat';
import {WebSocketService} from '../../web-socket.service';
import {ChatMessage} from '../../objects/messages/ChatMessage';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

    inputMessage = '';
    @Input() chat: Chat;

    constructor(private wsService: WebSocketService) {
    }

    onSend() {
        if (this.inputMessage !== '') {
            const chatMessage = new ChatMessage('chat', this.chat.user, sessionStorage.getItem('username'), this.inputMessage);
            this.wsService.send(chatMessage);
            this.inputMessage = '';
        }
    }

}
