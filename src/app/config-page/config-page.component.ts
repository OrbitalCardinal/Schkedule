import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'config-page',
    templateUrl: './config-page.component.html',
    styleUrls: ['./config-page.component.scss']
})

export class ConfigPageComponent implements OnInit {
    isLoading = true;
    user: any = null;

    ngOnInit() {
        setTimeout(() => {
            this.user = JSON.parse(localStorage.getItem('user'));
            this.isLoading = false;
        }, 1000 )
    }
}