import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "./gantt-page",
  templateUrl: "./gantt-page.component.html",
  styleUrls: ["./gantt-page.component.scss", '../../styles.scss'],
})
export class GanttPageComponent implements OnInit {

  // Modal variables
  modalActive = false;
  deleteModalActive = false;
  editModalActive = false;

  actualDeleteId = null;
  fechas: any[] = [];
  data_gantt: any = null;
  user: any = null;
  data_tasks: any = [];
  actualTask: any = null;

  constructor(private http: HttpClient) {}

  isLoading = true;
  ngOnInit() {
    setTimeout(() => {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.data_gantt = window.history.state['project'];
      this.fetchTasks();
      this.calcDates();
      this.isLoading = false;
    }, 500);

    console.log(this.fechas)
  }

  async fetchTasks() {
    await this.http.get(`http://localhost:3000/tareas_gantt?id_gantt=${this.data_gantt['id']}`).subscribe(response => {
      this.data_tasks = response;
    })
  }

  addDays(date: Date, days: number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  calcDates() {
    // Calcular fechas por periodos
    let fechaInicialGantt = new Date(this.data_gantt['fecha_inicial']);
    console.log(fechaInicialGantt);
    let semanas = this.data_gantt['semanas'];
    let tempDate = this.addDays(fechaInicialGantt, 6);
    let tempFechas = [];
    tempFechas.push(fechaInicialGantt, tempDate);
    for(let i = 0; i< semanas - 1; i++) {
      tempDate = this.addDays(tempDate, 6);
      tempFechas.push(tempDate);
    }

    for(let i = 1; i <= semanas; i++) {
      if(i < 2) {
        this.fechas.push([tempFechas[i-1], tempFechas[i]]);
      } else {
        this.fechas.push([this.addDays(tempFechas[i-1], i-1), this.addDays(tempFechas[i],i-1)]);
      }
    }

  }

  formatDate(date: any, sep: string) {
    date = new Date(date);
    let year = date.getUTCFullYear();
    let month: any = date.getUTCMonth() + 1;
    if (month < 10) {
      month = month.toString();
      month = "0" + month;
    }
    let day: any = date.getUTCDate();
    if (day < 10) {
      day = day.toString();
      day = "0" + day;
    }
    let stringDate = `${year}${sep}${month}${sep}${day}`;
    return stringDate;
  }

  calcPeriod(
    initSemana: Date,
    finalSemana: Date,
    initialDate: any,
    finalDate: any
  ) {
    initialDate = new Date(initialDate);
    finalDate = new Date(finalDate);

    // initialDate.setDate(initialDate.getDate());
    // finalDate.setDate(finalDate.getDate());

    if (
      initialDate.getTime() <= finalSemana.getTime() &&
      finalDate.getTime() >= initSemana.getTime()
    ) {
      return "active";
    }

    return "inactive";
  }

  addTask(taskData: NgForm) {
    let newTask = {
      id_gantt: this.data_gantt['id'],
      ...taskData.value
    }
    console.log(newTask);
    this.http.post('http://localhost:3000/tareas_gantt', newTask).subscribe(response => {
      this.fetchTasks();
      this.modalActive = !this.modalActive;
    });
  }

  deleteTask() {
    this.http.delete(`http://localhost:3000/tareas_gantt?id=${this.actualDeleteId}`).subscribe(response => {
      this.data_tasks = this.data_tasks.filter((element) => element["id"] != this.actualDeleteId);
      this.deleteModalActive = false;
    });
  }

  editTask(data: NgForm) {
    this.http.patch(`http://localhost:3000/tareas_gantt?id=${this.actualTask['id']}`, data.value).subscribe(response => {
      this.fetchTasks();
      this.editModalActive = !this.editModalActive;
    });
  }

}
