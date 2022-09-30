import { Component, Input } from "@angular/core";

@Component({
    selector: 'task-modal',
    templateUrl: './task-modal.component.html',
    styleUrls: ['./task-modal.component.scss']
})

export class TaskModal {
    @Input() toggleModalFunction = (taskData: any, newTask: any) => {};
    @Input() taskData: any = {};
    @Input() isNewTask = false;
    @Input() addNewTaskFunction = (taskData: any) => {}
    newTaskData = {
        'tarea': '',
        'estado': '',
        'categoria': '',
        'fechaInicial': '',
        'fechaFinal': ''
    }

    executeToggleModal() {
        this.toggleModalFunction(this.taskData, this.isNewTask);
    }

    test() {
        console.log(this.taskData);
    }

    executeAddNewTask() {
        this.addNewTaskFunction(this.taskData);
        this.toggleModalFunction(this.taskData, this.isNewTask);
    }
}