import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Console } from "console";

@Component({
  selector: "schedule-page",
  templateUrl: "./schedule-page.component.html",
  styleUrls: ["./schedule-page.component.scss"],
})
export class SchedulePageComponent implements OnInit {
  constructor(private http: HttpClient) {}
  isLoading = true;

  // Modal variables
  modalActive = false;
  editModalActive = false;
  isOverlapping = false;
  deleteModalActive = false;

  data: any = [];
  data_number = {};
  data_assigned = [];
  actualActivitie: any = null;
  horas = [
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
  ];

  horasAssigned = {
    "06:00": 1,
    "07:00": 2,
    "08:00": 3,
    "09:00": 4,
    "10:00": 5,
    "11:00": 6,
    "12:00": 7,
    "13:00": 8,
    "14:00": 9,
    "15:00": 10,
    "16:00": 11,
    "17:00": 12,
    "18:00": 13,
    "19:00": 14,
    "20:00": 15,
  };

  dias = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];

  diasAssigned = {
    Lunes: 1,
    Martes: 2,
    Miercoles: 3,
    Jueves: 4,
    Viernes: 5,
    Sabado: 6,
    Domingo: 7,
  };

  project: any = null;

  ngOnInit() {
    setTimeout(() => {
      this.project = window.history.state["project"];
      this.http
        .get(
          `http://localhost:3000/actividades_horario?id_horario=${this.project["id"]}`
        )
        .subscribe((response) => {
          this.data = response;
          this.setSchedule();
        });
      this.setSchedule();
      this.isLoading = false;
      this.setSchedule();
    }, 1000);
  }

  selectCell(cell: any) {
    console.log(this.actualActivitie);
  }

  editActivitie(data: NgForm) {
    let activitie = {
        id: this.actualActivitie['id'],
        nombre: data.value['nombre']
    }
    this.http.patch(`http://localhost:3000/actividades_horario?id=${activitie['id']}`, activitie).subscribe(response => {
        this.http
        .get(
          `http://localhost:3000/actividades_horario?id_horario=${this.project["id"]}`
        )
        .subscribe((response) => {
          this.data = response;
          this.setSchedule();
          this.editModalActive = !this.editModalActive;
        });
    })
  }

  

  setSchedule() {
    for (let i = 1; i <= 105; i++) {
      this.data_number[i] = false;
    }

    for (let i = 1; i <= 105; i++) {
      for (let j = 0; j < this.data.length; j++) {
        let formula = this.data[j]["dia"] + 7 * (this.data[j]["hora"] - 1);
        if (formula == i) {
          this.data_number[i] = true;
          this.data_assigned[i] = { ...this.data[j] };
        }
      }
    }
  }

  checkOverlap(activitie: any) {
    for(let i = 0; i < this.data.length; i++) {
        let tempDia = this.data[i]['dia'];
        let tempHora = this.data[i]['hora'];

        if(tempDia == activitie['dia'] && tempHora == activitie['hora']) {
            return true;
        }
    }
    return false;
  }

  

  addActivitie(data: NgForm) {
    let newTask = {
      id_horario: this.project["id"],
      nombre: data.value["nombre"],
      dia: this.diasAssigned[data.value["dia"]],
      hora: this.horasAssigned[data.value["hora"]],
    };

    let overlaps = this.checkOverlap(newTask);
    console.log(overlaps);
    if(!overlaps) {
        this.http
          .post("http://localhost:3000/actividades_horario", newTask)
          .subscribe((response) => {
            this.data.push(newTask);
            this.setSchedule();
            this.modalActive = !this.modalActive;
          });
    } else {
        this.isOverlapping = true;
    }
  }

  deleteActivitie() {
    this.http.delete(`http://localhost:3000/actividades_horario?id=${this.actualActivitie['id']}`).subscribe(response => {
        this.http
        .get(
          `http://localhost:3000/actividades_horario?id_horario=${this.project["id"]}`
        )
        .subscribe((response) => {
          this.data = response;
          this.setSchedule();
          this.editModalActive = false;
          this.deleteModalActive = false;
        });
    })
  }
}
