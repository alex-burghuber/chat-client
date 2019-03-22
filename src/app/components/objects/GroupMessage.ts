import {Message} from './Message';

export class GroupMessage extends Message {
    constructor(type: string,
                public action: string,
                public name: string) {
        super(type);
    }
}
