import { Component } from "@angular/core";

@Component({
    selector: 'recent-projects-page',
    templateUrl: './recent-projects-page.component.html',
    styleUrls: ['./recent-projects-page.component.scss']
})

export class RecentProjectsPageComponent {
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
    test() {
        console.log("TEST")
    }
}
