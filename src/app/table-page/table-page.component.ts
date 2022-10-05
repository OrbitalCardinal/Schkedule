import { Component, OnInit } from "@angular/core";

@Component({
  selector: "table-page",
  templateUrl: "./table-page.component.html",
  styleUrls: ["./table-page.component.scss"],
})
export class TablePageComponent implements OnInit {
  isLoading = true;

  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  modalActive = false;
  actualTaskData = {};
  isNewTask = false;
  title = "SA-Angular-Dev";
  data = [
    {
      tarea: "Creación de dashboard de clientes",
      estado: "Pendiente",
      categoria: "Business Intelligence",
      fechaInicial: "2021-10-12",
      fechaFinal: "2021-12-12",
    },
    {
      tarea: "Transformación de datos",
      estado: "En progreso",
      categoria: "Business Intelligence",
      fechaInicial: "2021-10-12",
      fechaFinal: "2021-12-12",
    },
    {
      tarea: "Creación de dashboard de clientes",
      estado: "Hecho",
      categoria: "Business Intelligence",
      fechaInicial: "2021-10-12",
      fechaFinal: "2021-12-12",
    },
    {
      tarea: "Creación de dashboard de clientes",
      estado: "Pendiente",
      categoria: "Business Intelligence",
      fechaInicial: "2021-10-12",
      fechaFinal: "2021-12-12",
    },
    {
      tarea: "Creación de dashboard de clientes",
      estado: "Hecho",
      categoria: "Business Intelligence",
      fechaInicial: "2021-10-12",
      fechaFinal: "2021-12-12",
    },
    {
      tarea: "Creación de dashboard de clientes",
      estado: "Pendiente",
      categoria: "Business Intelligence",
      fechaInicial: "2021-10-12",
      fechaFinal: "2021-12-12",
    },
    {
      tarea: "Creación de dashboard de clientes",
      estado: "Hecho",
      categoria: "Business Intelligence",
      fechaInicial: "2021-10-12",
      fechaFinal: "2021-12-12",
    },
    {
      tarea: "Creación de dashboard de clientes",
      estado: "Pendiente",
      categoria: "Business Intelligence",
      fechaInicial: "2021-10-12",
      fechaFinal: "2021-12-12",
    },
    {
      tarea: "Creación de dashboard de clientes",
      estado: "Hecho",
      categoria: "Business Intelligence",
      fechaInicial: "2021-10-12",
      fechaFinal: "2021-12-12",
    },
    {
      tarea: "Creación de dashboard de clientes",
      estado: "Pendiente",
      categoria: "Business Intelligence",
      fechaInicial: "2021-10-12",
      fechaFinal: "2021-12-12",
    },
    {
      tarea: "Creación de dashboard de clientes",
      estado: "Hecho",
      categoria: "Business Intelligence",
      fechaInicial: "2021-10-12",
      fechaFinal: "2021-12-12",
    },
    {
      tarea: "Creación de dashboard de clientes",
      estado: "Pendiente",
      categoria: "Business Intelligence",
      fechaInicial: "2021-10-12",
      fechaFinal: "2021-12-12",
    }
  ];

  addNewTask(taskData) {
    this.data.push(taskData);
    this.modalActive = false;
  }
}
