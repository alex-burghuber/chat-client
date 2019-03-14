import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    @Output() menuOpened = new EventEmitter<boolean>();
    isOpen = false;

    constructor() {
    }

    onMenu() {
        this.isOpen = !this.isOpen;
        this.menuOpened.emit(this.isOpen);
    }
}
