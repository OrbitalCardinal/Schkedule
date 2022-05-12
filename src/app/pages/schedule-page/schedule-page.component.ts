import { Component } from "@angular/core";
import { range } from "rxjs";
import { ActividadHorarioModel } from '../../models/actividad-horario-model';
import { ListActividadHorarioModel } from '../../models/list-actividad-horario-model'
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})

export class SchedulePageComponent {

  public ListActividad:ListActividadHorarioModel[] = []

  constructor() {

  }

  ngOnInit() {
    this.makeGrid();
  }

  private makeGrid() {

    let id_hora_frecuencia:number = 0;

    const totalHours:number = 12;
    const totalDays: number = 7;


    for (let indexHours = 0; indexHours < totalHours; indexHours++) {


      const listDays:ActividadHorarioModel[] = []

      for (let indexDays = 0; indexDays < totalDays; indexDays++) {

        const actividad: ActividadHorarioModel = {
          id_actividad_horario: '',
          id_horario: '',
          descripcion: '',
          id_hora_frecuencia: id_hora_frecuencia
        }

        listDays.push(actividad)

        id_hora_frecuencia++;
      }

      const listaHoras:ListActividadHorarioModel = {
        hora: indexHours.toString(),
        listDays: listDays,
      }

      this.ListActividad.push(listaHoras)
    }

    console.log(this.ListActividad)

  }

  private getmyHeaders() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    myHeaders.append("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    return myHeaders;
  }

  private getHorario(id_tablero: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Horario/";
    const myHeaders = this.getmyHeaders();

    let params: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_api}${id_tablero}.json`, params)
      .then(response => response.text())
      .then((result) => {
        console.log(result)
      })
      .catch(error => console.log('error', error));

  }

  private postHorario(nombre_horario: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Horario/";
    const myHeaders = this.getmyHeaders();

    const data = {
      nombre_horario
    }

    let params: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    const localStorageUser = JSON.parse(localStorage['user']);
    const lid_usuario = localStorageUser.id_usuario;

    fetch(`${url_api}${lid_usuario}.json`, params)
      .then(response => response.text())
      .then((result) => {
        // this.kanbanBoard[0].sections = []
        // this.getTarjetaKanban(this.kanbanBoard[0].id_tablero)
      })
      .catch(error => console.log('error', error));
  }

  private patchHorario(nombre_horario: string, id_horario: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Horario/";
    const myHeaders = this.getmyHeaders();

    const data = {
      nombre_horario
    }

    let params: RequestInit = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    const localStorageUser = JSON.parse(localStorage['user']);
    const lid_usuario = localStorageUser.id_usuario;

    fetch(`${url_api}${lid_usuario}/${id_horario}.json`, params)
      .then(response => response.text())
      .then((result) => {

      })
      .catch(error => console.log('error', error));
  }

  private getActividadHorario(id_Horario: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Actividad-Horario/";
    const myHeaders = this.getmyHeaders();

    let params: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_api}${id_Horario}.json`, params)
      .then(response => response.text())
      .then((result) => {

      })
      .catch(error => console.log('error', error));

  }

  private patchActividadKanban(descripcion: string, id_Horario: string, id_actividad_horario: string) {
    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Actividad-Kanban/";
    const myHeaders = this.getmyHeaders();

    const data = {
      descripcion
      //   kanbanTaskDescription: actividadKanban.kanbanTaskDescription,
      //   priority: actividadKanban.priority,
      //   Tags: actividadKanban.Tags,
      //   date: actividadKanban.date,
    }

    let params: RequestInit = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    fetch(`${url_api}${id_Horario}/${id_actividad_horario}.json`, params)
      .then(response => response.text())
      .then((result) => {
        // this.getActividadKanban(actividadKanban.id_tarjeta);
      })
      .catch(error => console.log('error', error));

  }

  private deleteActividadKanban(id_tarjeta: string, id_actividad_kanban: string) {
    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Actividad-Kanban/";
    const myHeaders = this.getmyHeaders();

    let params: RequestInit = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_api}${id_tarjeta}/${id_actividad_kanban}.json`, params)
      .then(response => response.text())
      .then((result) => {
        // this.getActividadKanban(id_tarjeta);
      })
      .catch(error => console.log('error', error));

  }

  private postActividadKanban(id_Horario: string, descripcion: string) {
    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Actividad-Kanban/";
    const myHeaders = this.getmyHeaders();

    const data = {
      descripcion
    }

    let params: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    fetch(`${url_api}${id_Horario}.json`, params)
      .then(response => response.text())
      .then((result) => {
        // this.getActividadKanban(id_tarjeta);
      })
      .catch(error => console.log('error', error));

  }

}
