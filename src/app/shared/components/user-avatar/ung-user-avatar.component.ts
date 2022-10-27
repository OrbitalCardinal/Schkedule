import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'ung-user-avatar',
    templateUrl: './ung-user-avatar.component.html',
    styleUrls: ['./ung-user-avatar.component.scss']
})

export class UngUserAvatar {
    @Input() name: string = '';
    @Input() deleteActive: boolean = true;
    @Output() deleteEvent = new EventEmitter();
    @Output() selectEvent = new EventEmitter();

    delete() {
        this.deleteEvent.emit();
    }

    select() {
        this.selectEvent.emit();
    }
}