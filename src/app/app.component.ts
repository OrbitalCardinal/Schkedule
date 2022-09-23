import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SA-Angular-Dev';
  data = [
    {
      "tarea": "Creación de dashboard de clientes",
      "estado": "Pendiente",
      "categoria": "Business Intelligence",
      "fechaInicial": "12/12/12",
      "fechaFinal": "12/12/12"
    },
    {
      "tarea": "Transformación de datos",
      "estado": "En progreso",
      "categoria": "Business Intelligence",
      "fechaInicial": "12/12/12",
      "fechaFinal": "12/12/12"
    },
    {
      "tarea": "Creación de dashboard de clientes",
      "estado": "Hecho",
      "categoria": "Business Intelligence",
      "fechaInicial": "12/12/12",
      "fechaFinal": "12/12/12"
    },
    {
      "tarea": "Creación de dashboard de clientes",
      "estado": "Pendiente",
      "categoria": "Business Intelligence",
      "fechaInicial": "12/12/12",
      "fechaFinal": "12/12/12"
    }
  ];
}
