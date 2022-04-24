import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'recent-projects-page',
    templateUrl: './recent-projects-page.component.html',
    styleUrls: ['./recent-projects-page.component.scss']
})

export class RecentProjectsPageComponent {
    constructor(private router: Router) {}
    userData = JSON.parse(localStorage.getItem('user')!);
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
            this.router.navigate(['/mainpage/project/new-project'], { state: {projectData: data} });
        })
        .catch(error => console.log('error', error));

    }
}
