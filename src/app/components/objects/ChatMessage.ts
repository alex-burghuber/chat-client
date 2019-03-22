import {Message} from './Message';

export class ChatMessage extends Message {
    constructor(type: string,
                public target: string,
                public name: string,
                public content: string) {
        super(type);
    }
}
