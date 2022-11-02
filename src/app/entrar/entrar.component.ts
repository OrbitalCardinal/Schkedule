import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
    selector: 'entrar',
    templateUrl: './entrar.component.html',
    styleUrls: ['./entrar.component.scss']
})

export class EntrarComponent implements OnInit {
    constructor(private router: Router) {}
    user: any;
    ngOnInit(): void {
        this.user = window.history.state;
    }

    entrar(formData: NgForm) {
        if(formData.value['contrasena'] == this.user['contrasena']) {
            this.router.navigateByUrl('/main-page');
            localStorage.setItem('user', JSON.stringify(this.user));
        }
    }

}