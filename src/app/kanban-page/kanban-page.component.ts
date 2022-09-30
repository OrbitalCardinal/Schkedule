import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'kanban-page',
    templateUrl: './kanban-page.component.html',
    styleUrls: ['./kanban-page.component.scss']
})

export class KanbanPageComponent implements OnInit {
    isLoading = true;
    ngOnInit() {
        setTimeout(() => {
            this.isLoading = false;
        }, 1000 )
    }
}