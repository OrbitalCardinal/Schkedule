import { Component } from "@angular/core";
import { KanbanModel } from "../../models/kanban-model";
import { KanbanSectionModel } from "../../models/kanban-section-model";
import { KanbanTaskModel } from "../../models/kanban-task-model";
import { SwitchKanbanModalService } from 'src/app/services/switch-kanban-modal.service';


@Component({
  selector: 'kanban-page',
  templateUrl: './kanban-page.component.html',
  styleUrls: ['./kanban-page.component.scss']
})

export class KanbanPageComponent {

  public kanbanBoard: KanbanModel;
  public modalSwitch: boolean = false;
  private id_tarjeta: string = "";

  constructor(private modalSwitchS: SwitchKanbanModalService) {

    // let KanbanSectionModel: KanbanSectionModel;
    // let KanbanTaskModel: KanbanTaskModel;

    // let Sections = [];
    // const randSection = this.randomIntFromInterval(1, 5) //TEST numero random de Sections

    // for (let i = 0; i < randSection; i++) {

    //   let Task = [];
    //   const randTask = this.randomIntFromInterval(1, 5) //TEST numero random de Task

    //   for (let j = 0; j < randTask; j++) {

    //     const KanbanTaskModel: KanbanTaskModel = {
    //       id_actividad_kanban: j.toString(),
    //       id_tarjeta: i.toString(),
    //       kanbanTaskDescription: "S: " + i + " - T: " + j,
    //       Tags: ["Mobile", "Web"],
    //       priority: "Baja",
    //       date: "Mar 3, 2022"
    //     }

    //     Task.push(KanbanTaskModel);

    //   }

    //   const KanbanSectionModel: KanbanSectionModel = {
    //     id_tarjeta: i.toString(),
    //     id_tablero: "1",
    //     kanbanSectionName: "Section: " + i,
    //     tasks: Task,
    //   }

    //   Sections.push(KanbanSectionModel);

    // }

    // this.kanbanBoard = {
    //   id_tablero: "1",
    //   id_usuario: "GflliiDTBkUH4PqBwPitmqefNbk2",
    //   kanbanName: "Tablero A",
    //   sections: Sections,
    // }



    this.kanbanBoard = {
      id_tablero: "1",
      id_usuario: "GflliiDTBkUH4PqBwPitmqefNbk2",
      kanbanName: "Tablero A",
      sections: [],
    }

  }

  ngOnInit() {
    this.modalSwitchS.$switchModal.subscribe((valor) => { this.modalSwitch = valor });

    this.modalSwitchS.$KanbanTaskModel.subscribe(
      (item) => {
        const index = this.kanbanBoard.sections.findIndex(element => element.id_tarjeta == this.id_tarjeta);
        item.id_tarjeta = this.id_tarjeta;
        this.kanbanBoard.sections[index].tasks.push(item)
      }
    );

  }

  // private randomIntFromInterval(min: number, max: number) { //TEST RANDOM NUMBER
  //   return Math.floor(Math.random() * max) + min
  // }

  public addKanbanSection() {

    let Sections = [];
    const porMientras = this.kanbanBoard.sections.length + 1;

    const KanbanSectionModel: KanbanSectionModel = {
      id_tablero: "1",
      id_tarjeta: porMientras.toString(),
      kanbanSectionName: "New Section",
      tasks: [],
    }

    Sections.push(KanbanSectionModel);

    this.getTableroKanban("-N11gsgqgFennvXsFCVl");

    this.kanbanBoard.sections.push(KanbanSectionModel);
  }

  public openKanbanModal(id_tarjeta: string) {
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

  private getTableroKanban(id_tablero: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Tablero-Kanban/";
    const myHeaders = this.getmyHeaders();

    debugger

    let params: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // const localStorageUser = JSON.parse(localStorage.user);
    // const lid_usuario = localStorageUser.id_usuario;
    const lid_usuario = 'GflliiDTBkUH4PqBwPitmqefNbk2';

    fetch(`${url_api}${lid_usuario}/${id_tablero}.json`, params)
      .then(response => response.text())
      .then((result) => {
        console.log(result)
      })
      .catch(error => console.log('error', error));

  }

  private postTableroKanban(kanbanName: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Tablero-Kanban/";
    const myHeaders = this.getmyHeaders();

    const data = {
      kanbanName: kanbanName
    }

    let params: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    // const localStorageUser = JSON.parse(localStorage.user);
    // const lid_usuario = localStorageUser.id_usuario;
    const lid_usuario = 'GflliiDTBkUH4PqBwPitmqefNbk2';

    fetch(`${url_api}${lid_usuario}.json`, params)
      .then(response => response.text())
      .then((result) => {

      })
      .catch(error => console.log('error', error));

  }

  private getTarjetaKanban(id_tablero: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Tarjeta-Kanban/";
    const myHeaders = this.getmyHeaders();

    let params: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${url_api}usuarios.json`, params)
      .then(response => response.text())
      .then((result) => {

      })
      .catch(error => console.log('error', error));

  }

  private postTarjetaKanban(kanbanName: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Tarjeta-Kanban/";
    const myHeaders = this.getmyHeaders();

    const data = {
      kanbanName
    }

    let params: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    fetch(`${url_api}${localStorage.getItem('id_usuario')}`, params)
      .then(response => response.text())
      .then((result) => {

      })
      .catch(error => console.log('error', error));

  }

}
