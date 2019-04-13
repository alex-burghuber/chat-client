import {ChatMessage} from './messages/ChatMessage';

export class Chat {
    constructor(public user: string,
                public messages?: ChatMessage[]) {
    }
}
