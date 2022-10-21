import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  fechas: Date[] = [];
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

  ngOnInit(): void {
    // Calcular fechas por periodos
    let fechaInicialGantt = new Date(this.data_gantt["fechaInicial"]);
    fechaInicialGantt = new Date(fechaInicialGantt.setDate(fechaInicialGantt.getDate() + 1));
    let semanas = this.data_gantt["semanas"];
    this.fechas.push(fechaInicialGantt);
    let tempFecha = null;
    let newFecha = null;
    for (var i = 0; i < semanas; i++) {
      tempFecha = this.fechas[i];
      newFecha = new Date()
      newFecha.setDate(tempFecha.getDate() + 7);
      this.fechas.push(newFecha);
    }

    console.log(this.fechas[0]);
  }

  formatDate(date: Date, sep: string) {
    let year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    if(month < 10) {
      month = month.toString();
      month = '0' + month;
    }
    let day: any = date.getDate();
    if(day < 10) {
      day = day.toString()
      day = '0' + day;
    }
    let stringDate = `${year}${sep}${month}${sep}${day}`
    return stringDate;
  }


  calcPeriod(semanaDate: Date, initialDate: any, finalDate: any) {
    initialDate = new Date(initialDate);
    finalDate = new Date(finalDate);
    initialDate.setDate(initialDate.getDate());
    finalDate.setDate(finalDate.getDate());
    if(semanaDate.getTime() >= initialDate.getTime() && semanaDate.getTime() <= finalDate.getTime()) {
      return 'active';
    } 

    return 'inactive';
  }

  addTask(taskData: NgForm) {
    let fechaInicial = new Date(taskData.value['fechaInicial']);
    let fechaFinal = new Date(taskData.value['fechaFinal']);
    if(fechaInicial.getTime() >= fechaFinal.getTime()) {
      return;
    }

    let newTask = {
      id: this.data_tasks[this.data_tasks.length - 1]['id'] + 1,
      titulo: taskData.value['titulo'],
      fechaInicial: taskData.value['fechaInicial'],
      fechaFinal: taskData.value['fechaFinal']
    }
    this.data_tasks.push(newTask);
  }

  deleteTask(id: number) {
    this.data_tasks = this.data_tasks.filter((element) => element['id'] != id);
  }
}
