import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import Swal from "sweetalert2";
import { DataSource } from "@angular/cdk/collections";
import { i18nMetaToJSDoc } from "@angular/compiler/src/render3/view/i18n/meta";

@Component({
    selector: 'new-gantt',
    templateUrl: './new-gantt.component.html',
    styleUrls: ['./new-gantt.component.scss']
})

export class NewGanttPage implements OnInit {
    constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {}
    userData = JSON.parse(localStorage.getItem('user')!);
    ganttId: any = '';
    ganttInfo: any;
    ganttName: any = '';
    editGanttName: boolean = true;
    datosGantt: any = [];
    datosIdGantt: any = [];
    ganttWeeks: any = []
    showModal = false;

    fecha_inicial: any;
    fecha_final: any;
    nombre_actividad: any;
    modal_index: any;
    modal_index_id: any;

    // datosGantt = [
    //     {
    //         'id_gantt': '1',
    //         'nombre_seccion': 'Planeacion',
    //         'actividades': [
    //             {
    //                 'nombre_actividad': 'Lluvia de ideas',
    //                 'fecha_actividad': new Date()
    //             },
    //             {
    //                 'nombre_actividad': 'Comprobación',
    //                 'fecha_actividad': new Date()
    //             }
    //         ]
    //     },
    //     {
    //         'id_gantt': '1',
    //         'nombre_seccion': 'Desarrollo',
    //         'actividades': [
    //             {
    //                 'nombre_actividad': 'Capacitación',
    //                 'fecha_actividad': new Date()
    //             },
    //             {
    //                 'nombre_actividad': 'Testing',
    //                 'fecha_actividad': new Date()
    //             }
    //         ]
    //     }
    // ]
    
    async ngOnInit() {
        await this.getQueryParams();
        await this.getGanttInfo();
        await this.getGanttSections();
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
        let newDate = year + '/' + month + '/' + day;
        return newDate;
    }

    async getQueryParams() {
        let params: any = await firstValueFrom(this.activatedRoute.queryParams);
        this.ganttId = params.gantt_id; 
    }

    async getGanttInfo() {
        this.ganttInfo =  await firstValueFrom(this.http.get(`https://schkedule-default-rtdb.firebaseio.com/gantt/${this.ganttId}.json`));    
        this.ganttName = this.ganttInfo['nombre_gantt']
        // Hacer semanas
        for(let i = 0; i < parseInt(this.ganttInfo['semanas']); i++) {
            this.ganttWeeks.push({'name': `Semana ${i + 1}`, 'value': new Date().setDate(new Date().getDate() + (i * 7))})
        }
        
    }

    async getGanttSections() {
        let ganttSections: any = await firstValueFrom(this.http.get(`https://schkedule-default-rtdb.firebaseio.com/actividad-gantt.json?orderBy="id_gantt"&equalTo="${this.ganttId}"`));
        console.log(ganttSections);
        this.datosIdGantt = Object.keys(ganttSections);
        let list:any = Object.values(ganttSections);
        if(list['actividades'] == null) {
            list['actividades'] = [];
        }
        this.datosGantt = [...list];
    }

    async changeGanttName() {
        let newGanttInfoData = {
            'id_usuario': this.userData['id_usuario'],
            'nombre_gantt': this.ganttName,
            'ultima_modificacion': new Date()
        }
        let patchResult = await firstValueFrom(this.http.patch(`https://schkedule-default-rtdb.firebaseio.com/gantt/${this.ganttId}.json`, newGanttInfoData));
        console.log(patchResult);
        this.editGanttName = true;
    }

    async newSection() {
        Swal.fire({
            title: 'Nombre de sección',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText:  'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: async (value) => {
                // patchFunction(editField, value);
                // Añadir nueva seccion con actividades vacias
                if(value != '') {
                    let nuevaSeccion = {
                        'id_gantt': this.ganttId,
                        'nombre_seccion': value,
                        'actividades': []
                    }
                    let postResult = await firstValueFrom(this.http.post(`https://schkedule-default-rtdb.firebaseio.com/actividad-gantt.json`, nuevaSeccion));
                    this.datosGantt.push(nuevaSeccion)
                }
                
            },
            allowOutsideClick: () => !Swal.isLoading()
          });
    }

    async newActivity(nombre_actividad: any, fecha_inicial: any, fecha_final: any, index: any, id_gantt: any) {
        console.log("ID GANTT", id_gantt)
        if(nombre_actividad != '' && this.fecha_inicial != null && this.fecha_final != null) {
            let nuevaActividad = {
                'nombre_actividad': nombre_actividad,
                'fecha_inicial': fecha_inicial,
                'fecha_final': fecha_final
            };
            console.log(this.datosGantt)
            this.datosGantt[index]['actividades'].push(nuevaActividad);
            await firstValueFrom(this.http.patch(`https://schkedule-default-rtdb.firebaseio.com/actividad-gantt/${id_gantt}.json`, this.datosGantt[index]));
            this.showModal = false;
            this.nombre_actividad = '';
            this.fecha_final = null;
            this.fecha_inicial = null;
        }
    }

    openModal(index: any, id_gantt: any) {
        this.showModal = true;
        this.modal_index = index;
        this.modal_index_id = id_gantt;
    }

    modalNewActivity() {
        this.newActivity( this.nombre_actividad, this.fecha_final, this.fecha_final, this.modal_index, this.modal_index_id);
    }

    equalDates(date1: any, date12: any, date2: any) {
        date1 = new Date(date1);
        date12 = new Date(date12);
        date1 = new Date(date1).setDate(new Date(date1).getDate() + 1);
        date1 = new Date(date1)
        date2 = new Date(date2);
        let date1_day = date1.getDate()
        let date1_month = date1.getUTCMonth();
        let date1_year = date1.getUTCFullYear();
        let date2_day = date2.getDate()
        let date2_month = date2.getUTCMonth();
        let date2_year = date2.getUTCFullYear();
        
        if (
            date1 >= date2
        ) {
            return true;
        } else {
            return false;
        }
    }

    barCount(actividad: any) {
        let conditions = []
        for(let i = 0; i < this.ganttWeeks.length; i++) {
            console.log(this.ganttWeeks[i]);
            if(this.equalDates(actividad['fecha_inicial'], actividad['fecha_final'], this.ganttWeeks[i]['value'])) {
                conditions.push(true);
            } else {
                conditions.push(false);
            }
        }
        console.log(conditions);
        return conditions;
    }
}