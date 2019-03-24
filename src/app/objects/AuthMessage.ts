import {Message} from './Message';

export class AuthMessage extends Message {
    constructor(public type: string,
                public action: string,
                public username: string,
                public password: string) {
        super(type);
    }
}
