import {Message} from './Message';

export class ChatMessage extends Message {
    constructor(public type: string,
                public target: string,
                public name: string,
                public content: string) {
        super(type);
    }
}
