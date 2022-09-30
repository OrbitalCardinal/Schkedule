import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'table-page',
    templateUrl: './table-page.component.html',
    styleUrls: ['./table-page.component.scss']
})

export class TablePageComponent implements OnInit {
    isLoading = true;

    ngOnInit() {
        setTimeout(() => {
            this.isLoading = false;
        }, 1000 )
    }

    modalActive = false;
    actualTaskData = {};
    isNewTask = false;
    title = 'SA-Angular-Dev';
    data = [
        {
        "id": 1,
        "tarea": "Creación de dashboard de clientes",
        "estado": "Pendiente",
        "categoria": "Business Intelligence",
        "fechaInicial": "2021-10-12",
        "fechaFinal": "2021-12-12"
        },
        {
        "id": 2,
        "tarea": "Transformación de datos",
        "estado": "En progreso",
        "categoria": "Business Intelligence",
        "fechaInicial": "2021-10-12",
        "fechaFinal": "2021-12-12"
        },
        {
        "id": 3,
        "tarea": "Creación de dashboard de clientes",
        "estado": "Hecho",
        "categoria": "Business Intelligence",
        "fechaInicial": "2021-10-12",
        "fechaFinal": "2021-12-12"
        },
        {
        "id": 4,
        "tarea": "Creación de dashboard de clientes",
        "estado": "Pendiente",
        "categoria": "Business Intelligence",
        "fechaInicial": "2021-10-12",
        "fechaFinal": "2021-12-12"
        }
    ];

    toggleModal = (taskData: any, isNewTask: any) => {
        this.isNewTask = isNewTask;
        this.actualTaskData = {...taskData};
        this.modalActive = !this.modalActive;
    }

    addNewTask = (taskData: any) => {
        this.data = [...this.data, taskData]
    }
} 