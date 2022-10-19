import { Component, Input } from "@angular/core";

@Component({
    selector: 'task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss'],
})

export class TaskCardComponent {
    @Input() taskData: any = [];
}