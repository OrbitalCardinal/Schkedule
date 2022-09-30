import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
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
      "fechaInicial": "12-12-12",
      "fechaFinal": "12-12-12"
    },
    {
      "id": 2,
      "tarea": "Transformación de datos",
      "estado": "En progreso",
      "categoria": "Business Intelligence",
      "fechaInicial": "12-12-12",
      "fechaFinal": "12-12-12"
    },
    {
      "id": 3,
      "tarea": "Creación de dashboard de clientes",
      "estado": "Hecho",
      "categoria": "Business Intelligence",
      "fechaInicial": "12-12-12",
      "fechaFinal": "12-12-12"
    },
    {
      "id": 4,
      "tarea": "Creación de dashboard de clientes",
      "estado": "Pendiente",
      "categoria": "Business Intelligence",
      "fechaInicial": "12-12-12",
      "fechaFinal": "12-12-12"
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
