import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'activity-card',
    templateUrl: './activity-card.component.html',
    styleUrls: ['./activity-card.component.scss']
})

export class ActivityCardComponent {
    @Input() title = '';
    @Input() last_modified = '';
    @Input() project_id = '';

    constructor(private router: Router) {}

    redirectProjectPage() {
        this.router.navigate([''])
        console.log(this.project_id);
            this.router.navigate(['/mainpage/project/new-project'], {queryParams: {
                project_id: this.project_id
            }} );
    }
}
