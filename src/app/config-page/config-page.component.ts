import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'config-page',
    templateUrl: './config-page.component.html',
    styleUrls: ['./config-page.component.scss']
})

export class ConfigPageComponent implements OnInit {
    isLoading = true;
    ngOnInit() {
        setTimeout(() => {
            this.isLoading = false;
        }, 1000 )
    }
}