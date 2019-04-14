import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    @Input() sidenavOpened: boolean;
    @Output() menuOpened = new EventEmitter<boolean>();

    constructor() {
    }

    onMenu() {
        this.sidenavOpened = !this.sidenavOpened;
        this.menuOpened.emit(this.sidenavOpened);
    }

    onDisconnect() {
    }

}
