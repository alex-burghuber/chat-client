import {Message} from './Message';

export class GroupMessage extends Message {
    constructor(public type: string,
                public action: string,
                public name: string) {
        super(type);
    }
}
