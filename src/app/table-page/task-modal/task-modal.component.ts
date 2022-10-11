import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'task-modal',
    templateUrl: './task-modal.component.html',
    styleUrls: ['./task-modal.component.scss']
})

export class TaskModalComponent implements OnInit {
    @Input() taskData = {};
    @Input() taskIndex = null;
    @Output() closeModalEvent = new EventEmitter<boolean>();
    @Output() addNewTaskEvent = new EventEmitter();

    ngOnInit(): void {
        if(this.taskData == null) {
            this.taskData = {
                'tarea': '',
                'estado': '',
                'categoria': '',
                'fechaInicial': '',
                'fechaFinal': ''
            }
        }
    }

    closeModal() {
        this.closeModalEvent.emit(false);
    }

    onSubmit(formData: NgForm) {
        if(this.taskData != null && this.taskIndex != null) {
            this.addNewTaskEvent.emit([formData.value, true, this.taskIndex]);
            return;    
        }
        this.addNewTaskEvent.emit([formData.value, false]);
    }
}