import {Message} from './Message';

export class ChatMessage extends Message {
    constructor(public type: string,
                public sender: string,
                public receiver: string,
                public kind: string,
                public time: number,
                public content: string) {
        super(type);
    }
}
