import { HttpClient } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "table-page",
  templateUrl: "./table-page.component.html",
  styleUrls: ["./table-page.component.scss"],
})
export class TablePageComponent implements OnInit {
  constructor(private http: HttpClient) {}

  isLoading = true;
  tableId = null;
  project: any | undefined = null;
  data: any[] = [];

  ngOnInit() {
    setTimeout(() => {
      this.project = window.history.state["project"];
      this.tableId = this.project["id"];
      this.http
        .get(`http://localhost:3000/tareas_tabla?id_tabla=${this.tableId}`)
        .subscribe((results: any) => {
          this.isLoading = false;
          this.data = results;
        });
      console.log(this.minDate);
    }, 500);
  }

  formatDate(date: string) {
    let dateFormat = new Date(date);
    return dateFormat.toLocaleDateString();
  }
  // Global variables
  minDate = new Date().toISOString().replace(/T.*/, "").split("-").join("-");

  // Active modal variables
  modalActive = false;
  deleteModalActive = false;
  editModalActive = false;

  // Actual task variables
  deleteId: any = null;
  actualTask: any = null;

  newTask(data: NgForm) {
    let taskData = data.value;
    let newTask = {
      id_tabla: this.tableId,
      nombre: taskData["nombre"],
      estado: taskData["estado"] == "" ? "Pendiente" : taskData["estado"],
      categoria: taskData["categoria"],
      fecha_inicial: taskData["fecha_inicial"],
      fecha_final: taskData["fecha_final"],
    };

    this.http
      .post("http://localhost:3000/tareas_tabla", newTask)
      .subscribe((result) => {
        this.data.push(newTask);
        this.modalActive = !this.modalActive;
      });
  }

  deleteTask() {
    this.http
      .delete(`http://localhost:3000/tareas_tabla?id=${this.deleteId}`)
      .subscribe((response) => {
        this.data = this.data.filter(
          (element) => element["id"] != this.deleteId
        );
        this.deleteModalActive = !this.deleteModalActive;
      });
  }

  editTask(data: NgForm) {
    this.http.patch(`http://localhost:3000/tareas_tabla?id=${this.actualTask['id']}`, data.value).subscribe((response: any) => {
      this.http
        .get(`http://localhost:3000/tareas_tabla?id_tabla=${this.tableId}`)
        .subscribe((results: any) => {
          this.isLoading = false;
          this.data = results;
          this.editModalActive = !this.editModalActive;
        });
    });


  }
}
