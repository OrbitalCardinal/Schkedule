import { Component, OnInit } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "kanban-page",
  templateUrl: "./kanban-page.component.html",
  styleUrls: ["./kanban-page.component.scss", "../../styles.scss"],
})
export class KanbanPageComponent implements OnInit {
  isLoading = true;
  project: any = null;

  // Modal Variables
  modalActive = false;
  editModalActive = false;
  deleteModalActive = false;

  data = [];
  data_pendiente: any = [];
  data_progreso: any = [];
  data_hecho: any = [];
  actualTask: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    setTimeout(() => {
      this.project = window.history.state["project"];
      this.http
        .get(
          `http://localhost:3000/tareas_kanban?id_tablero=${this.project["id"]}`
        )
        .subscribe((response: any) => {
          this.data = response;
          this.orderTasks();
          this.isLoading = false;
        });
    }, 500);
  }

  trackById(index: any, element: any) {
    return element.id;
  }

  async orderFetch() {
    await this.http
      .get(
        `http://localhost:3000/tareas_kanban?id_tablero=${this.project["id"]}`
      )
      .subscribe((response: any) => {
        this.data = response;
        this.data_pendiente = [];
        this.data_progreso = [];
        this.data_hecho = [];
        this.orderTasks();
      });
  }

  orderTasks() {
    this.data.forEach((task) => {
      if (task.estado == "Pendiente") {
        this.data_pendiente.push(task);
      } else if (task.estado == "En progreso") {
        this.data_progreso.push(task);
      } else if (task.estado == "Hecho") {
        this.data_hecho.push(task);
      }
    });
  }

  moveTask(dropEvent: CdkDragDrop<any>, estado: string) {
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

    let newTask = container.data[currentIndex];
    console.log(newTask);
    newTask["estado"] = estado;
    this.http
      .patch(`http://localhost:3000/tareas_kanban`, newTask)
      .subscribe((response: any) => {
        // console.log(response);
      });
  }

  agregarTarea(data: NgForm) {
    let newTask = {
      id_tablero: this.project["id"],
      ...data.value,
    };

    this.http
      .post("http://localhost:3000/tareas_kanban", newTask)
      .subscribe((response) => {
        this.orderFetch().then(() => {
          this.modalActive = !this.modalActive;
        })
      });
  }

  editTask(data: NgForm) {
    let newData = {
      id: this.actualTask["id"],
      ...data.value,
    };

    this.http
      .patch("http://localhost:3000/tareas_kanban", newData)
      .subscribe((response) => {
        this.orderFetch().then(() => {
          this.editModalActive = !this.editModalActive;
        });
      });
  }

  deleteTask() {
    this.http.delete(`http://localhost:3000/tareas_kanban?id=${this.actualTask['id']}`).subscribe(() => {
      this.orderFetch().then(() => {
        this.editModalActive = false;
        this.deleteModalActive = false;
      });
    });
  }
}
