import { Component, Input } from "@angular/core";

@Component({
    selector: 'activity-card',
    templateUrl: './activity-card.component.html',
    styleUrls: ['./activity-card.component.scss']
})

export class ActivityCardComponent {
    @Input() title = '';
    @Input() last_modified = '';
}
