import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'recent-projects-page',
    templateUrl: './recent-projects-page.component.html',
    styleUrls: ['./recent-projects-page.component.scss']
})

export class RecentProjectsPageComponent implements OnInit {

    userData = JSON.parse(localStorage.getItem('user')!);
    isLoading = true;
    userProjects: any;
    userProjectsIds: any;

    constructor(private router: Router, private http: HttpClient) {}

    ngOnInit() {
        this.http.get(`https://schkedule-default-rtdb.firebaseio.com/proyecto.json?orderBy="id_usuario"&equalTo="${this.userData['id_usuario']}"`).subscribe(result => {
            this.userProjects = Object.values(result);
            this.userProjectsIds = Object.keys(result);
        this.isLoading = false;
            console.log(this.userProjects);
        })
    }

    recentTest = [
        {
            'title': 'Proyect Integrador 1',
            'last_modified': '12/12/12'
        },
        {
            'title': 'Proyect Integrador 2',
            'last_modified': '12/12/12'
        },
        {
            'title': 'Proyect Integrador 3',
            'last_modified': '12/12/12'
        },
        {
            'title': 'Proyect Integrador 4',
            'last_modified': '12/12/12'
        },
        {
            'title': 'Proyect Integrador 5',
            'last_modified': '12/12/12'
        },
    ]
    newProject() {    
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "*");
        myHeaders.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
        myHeaders.append("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
        const data = {
            id_usuario: this.userData.id_usuario,
            nombre_proyecto: "Proyect test",
            ultima_modificacion: new Date(),
            fecha_creacion: new Date(),
        }

        let params: RequestInit = {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(data),
          redirect: 'follow'
        };

        const url_api = "https://schkedule-default-rtdb.firebaseio.com/";
        fetch(`${url_api}proyecto.json`, params)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            this.router.navigate(['/mainpage/project/new-project'], {queryParams: {
                project_id: JSON.parse(result)['name']
            }} );
        })
        .catch(error => console.log('error', error));

    }

    redirectProjectPage(project_id: any) {
        this.router.navigate([''])
        console.log(project_id);
            this.router.navigate(['/mainpage/project/new-project'], {queryParams: {
                project_id: project_id
            }} );
    }
}
