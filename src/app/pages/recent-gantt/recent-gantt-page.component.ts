import { Component, OnInit } from "@angular/core";
import { RecentGanttService } from "src/app/services/recent-gantt.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
    selector: 'recent-gantt-page',
    templateUrl: './recent-gantt-page.component.html',
    styleUrls: ['./recent-gantt-page.component.scss', 
                '../global-pages-styles/top-bar-styles.scss',
                '../global-pages-styles/global.styles.scss',
                '../global-pages-styles/ball-atom.scss']
})

export class RecentGanttPageComponent implements OnInit {
    constructor(private recentGanttService: RecentGanttService, private router: Router) {}

    isLoading = true;
    ganttList: any = [];
    ganttIdList: any = [];
    originalList: any = [];
    searchValue: String = '';
    showOrderMenu = false;
    actualOrder: String = 'Ordenar por';

    ngOnInit() {
        setTimeout(async () =>{
            let recentGantt: any = await this.recentGanttService.getRecentGantt();
            this.ganttList = [...recentGantt[0]];
            this.ganttIdList = [...recentGantt[1]];
            this.originalList = [...this.ganttList];
            this.isLoading = false;
        }, 1100)
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

    async newGantt() {
        Swal.fire({
            title: 'Ingrese el número de semanas',
            input: 'number',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText:  'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: async (value) => {
                // Añadir nueva seccion con actividades vacias
                if(value != null) {
                    let result: any = await this.recentGanttService.newGantt(value);
                    this.ganttList.push(result[1]);
                    this.router.navigate(['/mainpage/gantt/new-gantt'], {queryParams: {
                        gantt_id: result[0]['name']
                    }} );
                }
                
            },
            allowOutsideClick: () => !Swal.isLoading()
          })
        
    }

    redirectFunction = (ganttId: any) => {
        this.router.navigate(['/mainpage/gantt/new-gantt'], {queryParams: {
            gantt_id: ganttId
        }} );
    }

    deleteGantt = async (ganttId: any, index: any) => {
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
                await this.recentGanttService.deleteGantt(ganttId, index);
                Swal.fire(
                    'Eliminado!',
                    '',
                    'success'
                ).then(() => {
                    this.ganttList = this.ganttList.filter((_: any, index_: any) => index_ != index);
                    this.ganttIdList = this.ganttIdList.filter((_: any, index_: any) => index_ != index);
                });
            }
          });  
    }


    searchGantt() {
        console.log(this.searchValue);
        if(this.ganttList != '') {
            this.ganttList = this.originalList.filter((element: any) => element['nombre_gantt'].includes(this.searchValue));
        } else {
            this.ganttList = [...this.originalList];
        }    
    }


    orderProjects(mode: String) {
        if(mode == 'nombre-ascendente') {
            this.actualOrder = 'Nombre descendente ↑';
            this.ganttList.sort((a:any, b: any) => {
                let fa = a['nombre_proyecto'].toLowerCase(),
                    fb = b['nombre_proyecto'].toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
            
        }
        else if(mode == 'nombre-descendente') {
            this.actualOrder = 'Nombre descendente ↓';
            this.ganttList.sort((a:any, b: any) => {
                let fa = a['nombre_proyecto'].toLowerCase(),
                    fb = b['nombre_proyecto'].toLowerCase();
            
                if (fb < fa) {
                    return -1;
                }
                if (fb > fa) {
                    return 1;
                }
                return 0;
            });
        }
        else if(mode == 'fecha-ascendente') {
            this.actualOrder = 'Fecha ascendente ↑';
            this.ganttList.sort((a:any, b:any) => {
                let da: any = new Date(a['ultima_modificacion']),
                    db: any = new Date(b['ultima_modificacion']);
                return da - db;
            });
        }
        else if(mode == 'fecha-descendente') {
            this.actualOrder = 'Fecha descendente ↓';
            this.ganttList.sort((a:any, b:any) => {
                let da: any = new Date(a['ultima_modificacion']),
                    db: any = new Date(b['ultima_modificacion']);
                return db - da;
            });
        }
        this.showOrderMenu = false;
    }
}
