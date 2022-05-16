import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from "rxjs";
import { Router } from '@angular/router';
import Swal from "sweetalert2";

@Component({
    selector: 'search-component',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss', 
    '../global-pages-styles/ball-atom.scss',
    '../global-pages-styles/global.styles.scss']
})

export class SearchComponent implements OnInit {
    constructor(private http: HttpClient, private router: Router) {}
    userData = JSON.parse(localStorage.getItem('user')!);
    projectList: any[] = [];
    orginalList: any[] = [];
    projectListIds: any[] = [];
    recentKanbanBoards: any[] = [];
    isLoading = true;
    searchValue: String = '';

    async ngOnInit() {
        setTimeout(async () => {
            await this.getAllProjects();
            this.isLoading = false;
        }, 1000);
            
    }

    async getAllProjects() {
        let projectResults = await firstValueFrom(this.http.get(`https://schkedule-default-rtdb.firebaseio.com/proyecto.json?orderBy="id_usuario"&equalTo="${this.userData['id_usuario']}"`));
        let kanbanResults = await firstValueFrom(this.http.get(`https://schkedule-default-rtdb.firebaseio.com/Tablero-Kanban/${this.userData['id_usuario']}.json`));
        this.fillInKanbanData(kanbanResults, this.userData['id_usuario']);
        let ganttResults = await firstValueFrom(this.http.get(`https://schkedule-default-rtdb.firebaseio.com/Diagrama-Gantt.json?orderBy="id_usuario"&equalTo="${this.userData['id_usuario']}"`));
        let projects = Object.values(projectResults);
        let projectsIds = Object.keys(projectResults);
        projects.forEach(element => {
            element['tipo'] = 'clipboard';
            element['nombre'] = element['nombre_proyecto']
            element['redirectFunction'] = this.redirectProjectPage;
            element['deleteFunction'] = this.deleteProject;
        });
        let kanbans: any = [];
        let kanbansIds: any = [];
        if(kanbanResults != null) {    
            kanbans = Object.values(kanbanResults);
            kanbansIds = Object.keys(kanbanResults);
            kanbans.forEach((element: any) => {
                element['tipo'] = 'kanban';
                element['ultima_modificacion'] = element['modifiedAt'];
                element['nombre'] = element['kanbanName']
                element['redirectFunction'] = this.openKanban;
                element['deleteFunction'] = this.deleteKanban;
            });
            console.log(this.recentKanbanBoards);
        }
        let gantts = Object.values(ganttResults);
        let ganttsIds = Object.keys(ganttResults);
        gantts.forEach(element => {
            element['tipo'] = 'gantts';
        })

        this.projectList = [...projects, ...kanbans, ...gantts];
        this.projectListIds = [...projectsIds, ...kanbansIds, ...ganttsIds];
        this.orginalList = [...this.projectList];
        console.log(this.projectListIds);
        console.log(this.projectList);
    }

    formatDate(date: Date) {
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

    searchList() {
        console.log(this.searchValue);
        if(this.searchValue != '') {
            this.projectList = this.orginalList.filter((element: any) => element['nombre'].includes(this.searchValue));
        } else {
            this.projectList = [...this.orginalList];
        }
    }

    // Functiones de tarjetas
    // PROJECT
    public redirectProjectPage = (project_id: any) => {
        this.router.navigate([''])
        console.log(project_id);
            this.router.navigate(['/mainpage/project/new-project'], {queryParams: {
                project_id: project_id
            }} );
    }

        // Eliminar proyecto desde tarjeta
        public delProject = (index: any) => {
            console.log(this.projectList);
            this.projectList = this.projectList.filter((_: any, index_: any) => index_ != index)
            console.log(this.projectList); 
        }
    
        public deleteProject = (projectId: any, index: any) => {
            Swal.fire({
                title: '¿Estas seguro?',
                text: "No podras revertir esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, eliminarlo!',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                    // Eliminar en firebase
                    this.http.delete(`https://schkedule-default-rtdb.firebaseio.com/proyecto/${projectId}.json`).subscribe(result => {
                        console.log(result);
                    })
                  Swal.fire(
                    'Eliminado!',
                    '',
                    'success'
                  ).then(() => {
                      this.delProject(index);
                  })
                }
              })
        }
        // KANBAN
        public openKanban = (id_tablero: string) => {
            let $this = this;
            const searchByID = (element: any) => element.id_tablero == id_tablero;
            const index = $this.recentKanbanBoards.findIndex(searchByID)
            console.log($this.recentKanbanBoards[index])
            this.router.navigate(['mainpage/kanban/new-kanban'], { state: $this.recentKanbanBoards[index] });
          }

        private fillInKanbanData(result: any, lid_usuario: string) {
            // const data = JSON.parse(result);
            let data = result;
            for (let board in data) {
              const kanbanBoard: any = {
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
        
        public delKanban = (index: any) => {
            this.projectList = this.projectList.filter((_: any, index_: any) => index_ != index)
            console.log(this.projectList);
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
