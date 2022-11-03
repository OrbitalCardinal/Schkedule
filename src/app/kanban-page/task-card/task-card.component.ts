import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss'],
})

export class TaskCardComponent {
    @Input() taskData: any = [];
    @Output() editEvent = new EventEmitter();

    fireEdit() {
        this.editEvent.emit();
    }
}