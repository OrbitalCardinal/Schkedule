import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
})

export class HomePageComponent implements OnInit {
    isLoading = true;
    ngOnInit() {
        setTimeout(() => {
            this.isLoading = false;
        }, 1000 )
    }
}