import { Component, OnInit } from '@angular/core';
import { KanbanModel } from "../../models/kanban-model";
import { KanbanSectionModel } from "../../models/kanban-section-model";
import { KanbanTaskModel } from "../../models/kanban-task-model";
import { SwitchKanbanModalService } from 'src/app/services/switch-kanban-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-kanban-page',
  templateUrl: './new-kanban-page.component.html',
  styleUrls: ['./new-kanban-page.component.scss']
})

export class NewKanbanPageComponent implements OnInit {

  public kanbanBoard: KanbanModel[] = []
  public setTaskKanban: KanbanTaskModel[] = [];
  public modalSwitch: boolean = false;
  private id_tarjeta: string = "";

  constructor(private modalSwitchS: SwitchKanbanModalService, private router: Router) {
  }

  ngOnInit() {

    //Si no hay id_tablero no se puede cargar la página, hay que redirifir a recent-kanban
    if (history.state.id_tablero != undefined) {
      this.kanbanBoard = []
      this.kanbanBoard.push(history.state)
    } else {
      if (this.kanbanBoard.length == 0) { //Evitamos
        this.router.navigate(['mainpage/kanban/recent-kanban'])
      }
    }

    this.getTarjetaKanban(this.kanbanBoard[0].id_tablero);

    this.modalSwitchS.$switchModal.subscribe((valor) => { this.modalSwitch = valor });

    this.modalSwitchS.$KanbanTaskModel.subscribe(
      (item) => {
        if (item.editTaskKanban) {
          this.patchActividadKanban(item);
        } else {
          item.id_tarjeta = this.id_tarjeta;
          this.postActividadKanban(item.id_tarjeta, item);
        }
      }
    );

  }

  public addKanbanSection() {
    this.postTarjetaKanban(this.kanbanBoard[0].id_tablero, 'Nueva Sección');
  }

  public openKanbanModal(id_tarjeta: string) {
    this.setTaskKanban = []
    this.id_tarjeta = id_tarjeta;
    this.modalSwitch = true;
  }

  private getmyHeaders() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    myHeaders.append("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    return myHeaders;
  }

  private fillInKanbanSection(result: string) {
    const data = JSON.parse(result);
    for (let sectionId in data) {
      const KanbanSectionModel: KanbanSectionModel = {
        id_tablero: this.kanbanBoard[0].id_tablero,
        id_tarjeta: sectionId,
        kanbanSectionName: data[sectionId]['kanbanSectionName'],
        tasks: [],
        // Edit Controls
        editSectionKanban: true
      }
      this.kanbanBoard[0].sections.push(KanbanSectionModel);
      this.getActividadKanban(sectionId);
    }
  }

  private fillInKanbanTask(result: string, id_tarjeta: string) {
    const data = JSON.parse(result);

    const searchByIdTarjeta = (element: KanbanSectionModel) => element.id_tarjeta == id_tarjeta;
    const index = this.kanbanBoard[0].sections.findIndex(searchByIdTarjeta);
    this.kanbanBoard[0].sections[index].tasks = [];

    for (let taksID in data) {
      const KanbanTaskModel: KanbanTaskModel = {
        id_actividad_kanban: taksID,
        id_tarjeta: id_tarjeta,
        kanbanTaskDescription: data[taksID]['kanbanTaskDescription'],
        priority: data[taksID]['priority'],
        Tags: data[taksID]['Tags'],
        date: data[taksID]['date'],
        // Edit Controls
        editTaskKanban: false
      }
      this.kanbanBoard[0].sections[index].tasks.push(KanbanTaskModel);
    }
  }

  // private postTableroKanban(kanbanName: string) {

  //   // let section = [];
  //   const url_api = "https://schkedule-default-rtdb.firebaseio.com/Tablero-Kanban/";
  //   const myHeaders = this.getmyHeaders();

  //   const data = {
  //     kanbanName: kanbanName
  //   }

  //   let params: RequestInit = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: JSON.stringify(data),
  //     redirect: 'follow'
  //   };

  //   const lid_usuario = 'GflliiDTBkUH4PqBwPitmqefNbk2';

  //   fetch(`${url_api}${lid_usuario}.json`, params)
  //     .then(response => response.text())
  //     .then((result) => {

  //     })
  //     .catch(error => console.log('error', error));

  // }

  private getTarjetaKanban(id_tablero: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Tarjeta-Kanban/";
    const myHeaders = this.getmyHeaders();

    let params: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_api}${id_tablero}.json`, params)
      .then(response => response.text())
      .then((result) => {
        this.fillInKanbanSection(result);
      })
      .catch(error => console.log('error', error));

  }

  private postTarjetaKanban(id_tablero: string, kanbanSectionName: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Tarjeta-Kanban/";
    const myHeaders = this.getmyHeaders();

    const data = {
      kanbanSectionName
    }

    let params: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    fetch(`${url_api}${id_tablero}.json`, params)
      .then(response => response.text())
      .then((result) => {
        this.kanbanBoard[0].sections = []
        this.getTarjetaKanban(this.kanbanBoard[0].id_tablero)
      })
      .catch(error => console.log('error', error));
  }

  private patchTarjetaKanban(Section: KanbanSectionModel) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Tarjeta-Kanban/";
    const myHeaders = this.getmyHeaders();

    const data = {
      kanbanSectionName: Section.kanbanSectionName
    }

    let params: RequestInit = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    fetch(`${url_api}${Section.id_tablero}/${Section.id_tarjeta}.json`, params)
      .then(response => response.text())
      .then((result) => {

      })
      .catch(error => console.log('error', error));
  }

  private getActividadKanban(id_tarjeta: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Actividad-Kanban/";
    const myHeaders = this.getmyHeaders();

    let params: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_api}${id_tarjeta}.json`, params)
      .then(response => response.text())
      .then((result) => {
        this.fillInKanbanTask(result, id_tarjeta);
      })
      .catch(error => console.log('error', error));

  }

  private patchActividadKanban(actividadKanban: KanbanTaskModel) {
    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Actividad-Kanban/";
    const myHeaders = this.getmyHeaders();

    debugger

    const data = {
      kanbanTaskDescription: actividadKanban.kanbanTaskDescription,
      priority: actividadKanban.priority,
      Tags: actividadKanban.Tags,
      date: actividadKanban.date,
    }

    let params: RequestInit = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    fetch(`${url_api}${actividadKanban.id_tarjeta}/${actividadKanban.id_actividad_kanban}.json`, params)
      .then(response => response.text())
      .then((result) => {
        this.getActividadKanban(actividadKanban.id_tarjeta);
      })
      .catch(error => console.log('error', error));

  }

  private postActividadKanban(id_tarjeta: string, actividadKanban: KanbanTaskModel) {
    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Actividad-Kanban/";
    const myHeaders = this.getmyHeaders();

    const data = {
      kanbanTaskDescription: actividadKanban.kanbanTaskDescription,
      priority: actividadKanban.priority,
      Tags: actividadKanban.Tags,
      date: actividadKanban.date,
    }

    let params: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    fetch(`${url_api}${id_tarjeta}.json`, params)
      .then(response => response.text())
      .then((result) => {
        this.getActividadKanban(id_tarjeta);
      })
      .catch(error => console.log('error', error));

  }

  private patchTableroKanban(kanbanName: string, id_tablero: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Tablero-Kanban/";
    const myHeaders = this.getmyHeaders();
    const date: Date = new Date();

    const data = {
      kanbanName,
      modifiedAt: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }

    let params: RequestInit = {
      method: 'PATCH',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    const localStorageUser = JSON.parse(localStorage['user']);
    const lid_usuario = localStorageUser.id_usuario;

    fetch(`${url_api}${lid_usuario}/${id_tablero}.json`, params)
      .then(response => response.text())
      .then((result) => {

      })
      .catch(error => console.log('error', error));

  }

  public editKanbanName() {
    this.kanbanBoard[0].editTituloKanban = true
    this.patchTableroKanban(this.kanbanBoard[0].kanbanName, this.kanbanBoard[0].id_tablero);
  }

  public editSectionName(Section: KanbanSectionModel) {
    Section.editSectionKanban = true;
    this.patchTarjetaKanban(Section)
  }

  public editKanbanTask(task: KanbanTaskModel) {
    this.setTaskKanban = []
    task.editTaskKanban = true;
    this.setTaskKanban.push(task);
    this.modalSwitch = true
  }

}
