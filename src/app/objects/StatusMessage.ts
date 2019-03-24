import {Message} from './Message';

export class StatusMessage extends Message {
    constructor(public type: string,
                public isSuccess: boolean,
                public kind: string,
                public content: string) {
        super(type);
    }
}
