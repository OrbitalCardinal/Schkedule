import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "./gantt-page",
  templateUrl: "./gantt-page.component.html",
  styleUrls: ["./gantt-page.component.scss"],
})
export class GanttPageComponent implements OnInit {
  confirmModalActive = false;
  actualDeleteId = null;
  fechas: any[] = [];
  data_gantt = {
    nombre: "Proyecto Final",
    fechaInicial: "2022-10-01",
    semanas: 5,
  };

  data_tasks = [
    {
      id: 1,
      titulo: "Actividad 1",
      fechaInicial: "2022-10-01",
      fechaFinal: "2022-10-12",
    },
    {
      id: 2,
      titulo: "Actividad 2",
      fechaInicial: "2022-10-16",
      fechaFinal: "2022-10-19",
    },
    {
      id: 3,
      titulo: "Actividad 3",
      fechaInicial: "2022-10-09",
      fechaFinal: "2022-10-23",
    },
  ];

  isLoading = true;
  ngOnInit() {
    setTimeout(() => {
      // Calcular fechas por periodos
      let fechaInicialGantt = new Date(this.data_gantt["fechaInicial"]);
      fechaInicialGantt = new Date(
        fechaInicialGantt.setDate(fechaInicialGantt.getDate() + 1)
      );
      let semanas = this.data_gantt["semanas"];
      let tempFecha = null;
      let newFecha = new Date();
      newFecha.setDate(fechaInicialGantt.getDate() + 6)
      this.fechas.push([
        fechaInicialGantt,
        newFecha
      ]);
      for (var i = 0; i < semanas - 1; i++) {
          tempFecha = this.fechas[i][1];
          newFecha = new Date();
          newFecha.setDate(tempFecha.getDate() + 1);
          let newFecha2 = new Date();
          newFecha2.setDate(newFecha.getDate() + 6);
          this.fechas.push([newFecha, newFecha2]);
      }
      this.isLoading = false;
    }, 1000);

    console.log(this.fechas)
  }

  formatDate(date: Date, sep: string) {
    let year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    if (month < 10) {
      month = month.toString();
      month = "0" + month;
    }
    let day: any = date.getDate();
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

    initialDate.setDate(initialDate.getDate() + 1);
    finalDate.setDate(finalDate.getDate() + 1);

    if (
      initialDate.getTime() <= finalSemana.getTime() &&
      finalDate.getTime() >= initSemana.getTime()
    ) {
      return "active";
    }

    return "inactive";
  }

  addTask(taskData: NgForm) {
    let fechaInicial = new Date(taskData.value["fechaInicial"]);
    let fechaFinal = new Date(taskData.value["fechaFinal"]);
    fechaInicial.setDate(fechaInicial.getDate());
    fechaFinal.setDate(fechaFinal.getDate());
    console.log(fechaInicial);
    console.log(fechaFinal);
    if (fechaInicial.getTime() >= fechaFinal.getTime()) {
      return;
    }

    let newTask = {
      id: this.data_tasks[this.data_tasks.length - 1]["id"] + 1,
      titulo: taskData.value["titulo"],
      fechaInicial: taskData.value["fechaInicial"],
      fechaFinal: taskData.value["fechaFinal"],
    };
    this.data_tasks.push(newTask);
  }

  deleteTask(canDelete: boolean, id: number) {
    if(canDelete) {
      this.data_tasks = this.data_tasks.filter((element) => element["id"] != id);
    }
    this.confirmModalActive = false;
  }
}
