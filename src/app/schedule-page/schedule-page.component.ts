import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'schedule-page',
    templateUrl: './schedule-page.component.html',
    styleUrls: ['./schedule-page.component.scss']
})

export class SchedulePageComponent implements OnInit {
    isLoading = true;
    ngOnInit() {
        setTimeout(() => {
            this.isLoading = false;
        }, 1000 )
    }
}