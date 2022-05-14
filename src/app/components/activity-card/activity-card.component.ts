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
    @Input() deleteFunction: any[] = []
    @Input() isKanban: Boolean = false;

    constructor(private router: Router) {}

    
    executeDeleteFunction() {
        if(this.deleteFunction.length > 1) {
            let params = this.deleteFunction.slice(1, this.deleteFunction.length)
            console.log(params)
            this.deleteFunction[0](...params);
        } else {
            this.deleteFunction[0]();
        }
        
    }

    executeCardFunction() {
        if(this.cardFunction.length > 1) {
            let params = this.cardFunction.slice(1, this.cardFunction.length);
            console.log(params)
            this.cardFunction[0](...params);  
        } else {
            this.cardFunction[0]();
        }
        
    }
}
