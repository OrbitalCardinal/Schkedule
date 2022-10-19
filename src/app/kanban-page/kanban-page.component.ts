import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";

@Component({
  selector: "kanban-page",
  templateUrl: "./kanban-page.component.html",
  styleUrls: ["./kanban-page.component.scss"],
})
export class KanbanPageComponent implements OnInit {
  isLoading = true;
  ngOnInit() {
    this.data.forEach((task) => {
      if (task.estado == "Pendiente") {
        this.data_pendiente.push(task);
      } else if (task.estado == "En progreso") {
        this.data_progreso.push(task);
      } else if (task.estado == "Hecho") {
        this.data_hecho.push(task);
      }
    });
    
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  data = [
    {
      id: 1,
      categoria: "Development",
      titulo: "Pantalla de inicio",
      descripcion:
        "Desarrollar pantalla de inicio de sesión basado en diseño de figma",
      prioridad: "Baja",
      estado: "Pendiente",
    },
    {
      id: 2,
      categoria: "Development",
      titulo: "Pantalla de inicio",
      descripcion:
        "Desarrollar pantalla de inicio de sesión basado en diseño de figma",
      prioridad: "Media",
      estado: "En progreso",
    },
    {
      id: 3,
      categoria: "Data Engineering",
      titulo: "Pantalla de inicio",
      descripcion:
        "Desarrollar pantalla de inicio de sesión basado en diseño de figma",
      prioridad: "Baja",
      estado: "Pendiente",
    },
    {
      id: 4,
      categoria: "Development",
      titulo: "Pantalla de inicio",
      descripcion:
        "Desarrollar pantalla de inicio de sesión basado en diseño de figma",
      prioridad: "Media",
      estado: "Hecho",
    },
    {
      id: 5,
      categoria: "UI",
      titulo: "Pantalla de inicio",
      descripcion:
        "Desarrollar pantalla de inicio de sesión basado en diseño de figma",
      prioridad: "Alta",
      estado: "En progreso",
    },
  ];

  data_pendiente: any = [];
  data_progreso: any = [];
  data_hecho: any = [];

  trackById(index: any, element: any) {
    return element.id;
  }

  moveTask(dropEvent: CdkDragDrop<any>) {
    const { previousContainer, container, previousIndex, currentIndex } =
      dropEvent;
    const isSameContainer = previousContainer === container;
    if (isSameContainer && previousIndex == currentIndex) {
      return;
    }

    isSameContainer
      ? moveItemInArray(container.data, previousIndex, currentIndex)
      : transferArrayItem(
          previousContainer.data,
          container.data,
          previousIndex,
          currentIndex
        );
  }
}
