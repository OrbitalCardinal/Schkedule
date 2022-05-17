import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { first, firstValueFrom } from "rxjs";
import Swal from "sweetalert2";

@Injectable()
export class RecentGanttService {
    constructor(private http: HttpClient) {}

    url: String = 'https://schkedule-default-rtdb.firebaseio.com/';
    userData = JSON.parse(localStorage.getItem('user')!);

    async newGantt(weeks: number) {
        let newGanttData = {
            'id_usuario': this.userData['id_usuario'],
            'nombre_gantt': 'Nuevo diagrama de Gantt',
            'semanas': weeks,
            "ultima_modificacion": new Date()
        }
        let postResult = await firstValueFrom(this.http.post(this.url + 'gantt.json', newGanttData));

        if(postResult != null) {
            return [postResult, newGanttData];
        } else {
            return {};
        }
    }

    async getRecentGantt() {
        let getResult = await firstValueFrom(this.http.get(this.url + `gantt.json?orderBy="id_usuario"&equalTo="${this.userData['id_usuario']}"`));
        if(getResult != null) {
            return [Object.values(getResult), Object.keys(getResult)];
        } else {
            return {};
        }
    }

    deleteGantt = async (projectId: any, index: any) => {
        console.log(projectId);
        let deleteResult: any = await firstValueFrom(this.http.delete(`https://schkedule-default-rtdb.firebaseio.com/gantt/${projectId}.json`));
        console.log(deleteResult);
        return deleteResult;
    }
}