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
            const chatMessage = new ChatMessage(
                'chat',
                sessionStorage.getItem('username'),
                this.chat.contact,
                'user',
                Date.now(),
                this.inputMessage
            );
            this.chat.messages.push(chatMessage);
            this.wsService.send(chatMessage);
            this.inputMessage = '';
        }
    }

}
