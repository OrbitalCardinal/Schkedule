import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.scss']
})

export class MainPageComponent implements OnInit {
    user: any;
    ngOnInit(): void {
        this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }
    
}