import { Component, OnInit } from "@angular/core";

@Component({
    selector: './gantt-page',
    templateUrl: './gantt-page.component.html',
    styleUrls: ['./gantt-page.component.scss']
})

export class GanttPageComponent implements OnInit {
    isLoading = true;
    ngOnInit() {
        setTimeout(() => {
            this.isLoading = false;
        }, 1000 )
    }
}