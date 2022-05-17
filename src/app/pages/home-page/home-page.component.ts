import { Component , OnInit } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { HomePageService } from "../../services/home-page.service";
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
    selector: 'home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss',
                '../global-pages-styles/global.styles.scss',
                '../global-pages-styles/ball-atom.scss']
})

export class HomePageComponent implements OnInit { 
    monthlyCount: any[] = [];
    constructor(private http: HttpClient, private router: Router, private homePageService: HomePageService) {
        this.monthlyCount = [
                {"month": "Enero", "count": 0},
                {"month": "Febrero", "count": 0},
                {"month": "Marzo", "count": 0},
                {"month": "Abril", "count": 0},
                {"month": "Mayo", "count": 0},
                {"month": "Junio", "count": 0},
                {"month": "Julio", "count": 0},
                {"month": "Agosto", "count": 0},
                {"month": "Septiembre", "count": 0},
                {"month": "Octubre", "count": 0},
                {"month": "Noviembre", "count": 0},
                {"month": "Diciembre", "count": 0},
        
            ];
    }

    // Chart
    view: [number, number] = [700, 400];
  
    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Meses';
    showYAxisLabel = true;
    yAxisLabel = 'Cantidad';


    colorScheme: Color = {
        name: 'myScheme',
        selectable: true,
        group: ScaleType.Ordinal,
        domain: ['#f00', '#0f0', '#0ff', '#0ff', '#0ff', '#0ff', '#0ff', '#0ff', '#0ff', '#0ff', '#0ff', '#0ff'],
    };

    // Database
    userData = JSON.parse(localStorage.getItem('user')!);
    projectList: any[] = [];
    orginalList: any[] = [];
    projectListIds: any[] = [];
    recentKanbanBoards: any[] = [];
    isLoading = true;
    searchValue: String = '';
    counts: any = {};

    ngOnInit() {
        setTimeout(async () => {
            await this.getAllProjects();
            this.counts = await this.homePageService.getProjectCount();
            this.monthlyCount = await this.homePageService.getMonthlyCount();;
            this.isLoading = false;
            console.log(this.monthlyCount);
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
        }
        let gantts = Object.values(ganttResults);
        let ganttsIds = Object.keys(ganttResults);
        gantts.forEach(element => {
            element['tipo'] = 'gantts';
        })

        this.projectList = [...projects, ...kanbans, ...gantts];
        this.projectListIds = [...projectsIds, ...kanbansIds, ...ganttsIds];
        this.orginalList = [...this.projectList];
        // console.log(this.projectListIds);
        // console.log(this.projectList);

        // Ordenar
        let orderList:any =  [];
        for(let i = 0; i < this.projectList.length; i++) {
            orderList.push([this.projectListIds[i], this.projectList[i]]);
        }
        // console.log(orderList);
        orderList.sort((a:any, b:any) => {
            let da: any = new Date(a[1]['ultima_modificacion']),
                db: any = new Date(b[1]['ultima_modificacion']);
            return db - da;
        });

        for(let i = 0; i < orderList.length; i++) {
            this.projectList[i] = orderList[i][1];
            this.projectListIds[i] = orderList[i][0];
        }

        this.projectList = this.projectList.splice(0, 4);
        this.projectListIds = this.projectListIds.splice(0, 4);
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
                    this.http.delete(`https://schkedule-default-rtdb.firebaseio.com/Tablero-Kanban/${this.userData['id_usuario']}/${projectId}.json`).subscribe(result => {
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
