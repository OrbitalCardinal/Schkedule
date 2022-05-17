import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable()
export class HomePageService {
    projectResults: any;
    kanbanResults: any;
    ganttResults: any;
    constructor(private http: HttpClient) {}

    userData = JSON.parse(localStorage.getItem('user')!);

    async getUserProyects() {
        this.projectResults = await firstValueFrom(this.http.get(`https://schkedule-default-rtdb.firebaseio.com/proyecto.json?orderBy="id_usuario"&equalTo="${this.userData['id_usuario']}"`));
        this.kanbanResults = await firstValueFrom(this.http.get(`https://schkedule-default-rtdb.firebaseio.com/Tablero-Kanban/${this.userData['id_usuario']}.json`));
        this.ganttResults = await firstValueFrom(this.http.get(`https://schkedule-default-rtdb.firebaseio.com/Diagrama-Gantt.json?orderBy="id_usuario"&equalTo="${this.userData['id_usuario']}"`));   
    }

    async getProjectCount() {
        await this.getUserProyects();
        let projectCount = Object.values(this.projectResults).length;
        let kanbanCount = Object.values(this.kanbanResults).length;
        let ganttCount = Object.values(this.ganttResults).length;

        return [
            {"name": "Proyectos", "value": projectCount},
            {"name": "Kanban", "value": kanbanCount},
            {"name": "Gantt", "value": ganttCount}
        ];
    }

    async getMonthlyCount() {
        let kanbanValues: any[] = [];
        Object.values(this.kanbanResults).forEach((value: any) => {
            value['ultima_modificacion'] = value['modifiedAt'];
            kanbanValues.push(value);
        });

        let values = [
                        ...Object.values(this.projectResults),
                        ...kanbanValues,
                        ...Object.values(this.ganttResults)
                     ];

        let monthlyCount: any = [
            {'name': "Enero", "value": 0},
            {'name': "Febrero", "value": 0},
            {'name': "Marzo", "value": 0},
            {'name': "Abril", "value": 0},
            {'name': "Mayo", "value": 0},
            {'name': "Junio", "value": 0},
            {'name': "Julio", "value": 0},
            {'name': "Agosto", "value": 0},
            {'name': "Septiembre", "value": 0},
            {'name': "Octubre", "value": 0},
            {'name': "Noviembre", "value": 0},
            {'name': "Diciembre", "value": 0},

        ];

        values.forEach((values: any) => {
            let ultimaModificacion = new Date(values['ultima_modificacion']);
            let month = ultimaModificacion.getUTCMonth();
            monthlyCount[month]['value'] = monthlyCount[month]['value'] + 1;
        });
        return monthlyCount;
    }
}