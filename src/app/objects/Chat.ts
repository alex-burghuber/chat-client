import {ChatMessage} from './messages/ChatMessage';

export class Chat {
    constructor(public contact: string,
                public kind: string,
                public messages: ChatMessage[]) {
    }
}
