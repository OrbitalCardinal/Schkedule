import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { LegendPosition } from "@swimlane/ngx-charts";

@Component({
    selector: 'home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss', '../../styles.scss']
})

export class HomePageComponent implements OnInit {
    stateTabla: any = [];
    stateKanban: any = [];
    projectCount: any = [];
    totalCount: number = 0;
    nTabla = 0;
    nKanban = 0;
    nGantt = 0;
    nHorario = 0;
    below = LegendPosition.Below;

    isLoading = true;
    user: any = null;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        setTimeout(() => {
            
            this.user = JSON.parse(localStorage.getItem('user'));
            // Table state
            this.http.get(`http://localhost:3000/table_count?id_usuario=${this.user['id']}`).subscribe((response: any[]) => {
                if(response.length > 0) {
                    response.forEach(element => {
                        this.stateTabla.push({
                            name: element['estado'],
                            value: element['count']
                        });
                        this.nTabla = this.nTabla + element['count'];
                    });
                }

                // Kanban State
                this.http.get(`http://localhost:3000/kanban_count?id_usuario=${this.user['id']}`).subscribe((response: any[]) => {
                    if(response.length > 0) {
                        response.forEach(element => {
                            this.stateKanban.push({
                                name: element['estado'],
                                value: element['count']
                            });
                            this.nKanban = this.nKanban + element['count'];
                        });
                    }


                    // Gantt state
                    this.http.get(`http://localhost:3000/gantt_count?id_usuario=${this.user['id']}`).subscribe((response:any[]) => {
                        if(response.length > 0) {
                            this.nGantt = response[0]['count'];
                        }

                        // Horario state
                        this.http.get(`http://localhost:3000/horario_count?id_usuario=${this.user['id']}`).subscribe((response: any[]) => {
                            if(response.length > 0) {
                                this.nHorario = response[0]['count'];
                            }

                            // Project count
                            this.http.get(`http://localhost:3000/project_count?id_usuario=${this.user['id']}`).subscribe(response => {
                                this.projectCount = [
                                    {
                                        name: 'Tablas',
                                        value: response[0]['n_tablas']
                                    },
                                    {
                                        name: 'Tablero Kanban',
                                        value: response[0]['n_tableros']
                                    },
                                    {
                                        name: 'Diagramas Gantt',
                                        value: response[0]['n_diagramas']
                                    },
                                    {
                                        name: 'Horarios',
                                        value: response[0]['n_horarios']
                                    }
                                ];

                                this.totalCount = response[0]['total'];
                            });
                            this.isLoading = false;
                        });
                    });
                });
            });

            
        }, 500);
    }
}