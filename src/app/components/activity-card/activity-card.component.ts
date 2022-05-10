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
    @Input() icon = '';
    @Input() cardFunction: any[] = [];
    @Input() isKanban: Boolean = false;

    constructor(private router: Router) {}

    

    executeCardFunction() {
        let params = this.cardFunction.slice(1, this.cardFunction.length);
        this.cardFunction[0](this.cardFunction[1], ...params);
    }

    deleteProject() {
        console.log("Deleting project");
    }
}
