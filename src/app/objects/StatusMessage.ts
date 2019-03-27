import {Message} from './Message';

export class StatusMessage extends Message {
    constructor(public type: string,
                public kind: string,
                public isSuccess: boolean,
                public content: string) {
        super(type);
    }
}
