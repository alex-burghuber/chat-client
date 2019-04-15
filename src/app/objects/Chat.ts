import {ChatMessage} from './messages/ChatMessage';

export class Chat {
    constructor(public contact: string,
                public messages?: ChatMessage[]) {
    }
}
