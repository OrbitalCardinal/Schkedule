import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'task-modal',
    templateUrl: './task-modal.component.html',
    styleUrls: ['./task-modal.component.scss']
})

export class TaskModalComponent {
    @Output() closeModalEvent = new EventEmitter<boolean>();
    @Output() addNewTaskEvent = new EventEmitter();

    closeModal() {
        this.closeModalEvent.emit(false);
    }

    onSubmit(formData: NgForm) {
        this.addNewTaskEvent.emit(formData.value);
    }
}