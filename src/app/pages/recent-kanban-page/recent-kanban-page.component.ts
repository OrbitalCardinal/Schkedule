import { Component, OnInit } from '@angular/core';
import { KanbanModel } from "../../models/kanban-model";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-recent-kanban-page',
  templateUrl: './recent-kanban-page.component.html',
  styleUrls: ['./recent-kanban-page.component.scss', 
  '../global-pages-styles/top-bar-styles.scss', 
  '../global-pages-styles/ball-atom.scss',
  '../global-pages-styles/global.styles.scss']
})
export class RecentKanbanPageComponent implements OnInit {

  public isLoading = true;

  constructor(public router: Router, private http: HttpClient) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.getTablerosKanban('');
      this.isLoading = false;
    }, 900);

  }

  public recentKanbanBoards: KanbanModel[] = [];


  public nuevoTableroKanban() {
    this.postTableroKanban("Nuevo Tablero")
  }

  public openKanban = (id_tablero: string) => {
    let $this = this;
    const searchByID = (element: KanbanModel) => element.id_tablero == id_tablero;
    const index = $this.recentKanbanBoards.findIndex(searchByID)
    console.log($this.recentKanbanBoards[index])
    this.router.navigate(['mainpage/kanban/new-kanban'], { state: $this.recentKanbanBoards[index] });
  }

  public boundedOpenKanban = this.openKanban.bind(this);

  private getmyHeaders() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    myHeaders.append("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
    return myHeaders;
  }

  private getTablerosKanban(id_tablero: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Tablero-Kanban/";
    const myHeaders = this.getmyHeaders();

    let params: RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    const localStorageUser = JSON.parse(localStorage['user']);
    const lid_usuario = localStorageUser.id_usuario;

    fetch(`${url_api}${lid_usuario}.json`, params)
      .then(response => response.text())
      .then((result) => {
        this.fillInKanbanData(result, lid_usuario);
        //Si tenemos el id del tablero lo abrimos
        if (id_tablero != '') {
          this.openKanban(id_tablero)
        }
      })
      .catch(error => console.log('error', error));

  }

  private fillInKanbanData(result: string, lid_usuario: string) {
    const data = JSON.parse(result);
    for (let board in data) {
      const kanbanBoard: KanbanModel = {
        id_tablero: board,
        id_usuario: lid_usuario,
        kanbanName: data[board]['kanbanName'],
        modifiedAt: data[board]['modifiedAt'],
        sections: [],
        editTituloKanban: true //Se inicia en true siempre
      };
      this.recentKanbanBoards.push(kanbanBoard);
    }
  }

  private postTableroKanban(kanbanName: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/Tablero-Kanban/";
    const myHeaders = this.getmyHeaders();
    const date: Date = new Date();

    const data = {
      kanbanName: kanbanName,
      modifiedAt: date
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
        const data = JSON.parse(result)
        this.recentKanbanBoards = []
        this.getTablerosKanban(data.name)
      })
      .catch(error => console.log('error', error));

  }

  formatDate(date: any) {
    let tDate = new Date(date);
    let year = tDate.getUTCFullYear();
    let month:any = parseInt(tDate.getUTCMonth().toString()) + 1;
    let day:any = tDate.getUTCDate();
    let hours: any = tDate.getHours();
    let minutes: any = tDate.getMinutes();
    if(hours < 9) {
        hours = '0' + hours;
    }
    if(minutes < 9) {
        minutes = '0' + minutes;
    }
    if(month < 10) {
        month = '0' + month.toString();
    }
    if(day < 10) {
        day = '0' + day;
    }
    let time =  hours + ':' + minutes;
    let newDate = year + '/' + month + '/' + day + ' ' + time;
    return newDate;
}

//  // Eliminar proyecto desde tarjeta
 public delKanban = (index: any) => {
  this.recentKanbanBoards = this.recentKanbanBoards.filter((_: any, index_: any) => index_ != index)
  console.log(this.recentKanbanBoards);
}

public deleteKanban = (projectId: any, index: any) => {
  Swal.fire({
      title: '¿Estas seguro?',
      text: "No podras revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
          // Eliminar en firebase
          let parentKey = '';
          console.log(projectId);
          let tableros: any = await firstValueFrom(this.http.get(`https://schkedule-default-rtdb.firebaseio.com/Tablero-Kanban.json`));
          console.log(tableros); 
          for(let key of Object.keys(tableros)) {
            for(let key2 of Object.keys(tableros[key])) {
              console.log(key2);
              if(key2 == projectId) {
                parentKey = key;
                break;
              }
            }
          }
          this.http.delete(`https://schkedule-default-rtdb.firebaseio.com/Tablero-Kanban/${parentKey}/${projectId}.json`).subscribe(result => {
            console.log(result);
          });
        Swal.fire(
          'Eliminado!',
          '',
          'success'
        ).then(() => {
            this.delKanban(index);
        })
      }
    })
}

}
