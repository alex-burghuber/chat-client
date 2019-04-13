import {Message} from './Message';

export class StatusMessage extends Message {
    constructor(public type: string,
                public kind: string,
                public success: boolean,
                public content: string) {
        super(type);
    }
}
