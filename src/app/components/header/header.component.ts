import {Component} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    uri = 'ws://localhost:8025/websockets/chat/test';

    constructor() {
    }

}
