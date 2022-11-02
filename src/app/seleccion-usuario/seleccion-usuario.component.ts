import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'seleccion-usuario',
    templateUrl: './seleccion-usuario.component.html',
    styleUrls: ['./seleccion-usuario.component.scss']
})

export class SeleccionUsuarioComponent implements OnInit {
    constructor(private http: HttpClient, private router: Router) {}
    users: any[] = [];
    actualUser: any = null;
    deleteModalActive = false;

    ngOnInit(): void {
        this.http.get('http://localhost:3000/usuarios').subscribe((result: any) => {
            this.users = result;
        });
    }

    deleteUser() {
        this.http.delete(`http://localhost:3000/usuarios?id=${this.actualUser['id']}`).subscribe((result) => {
            this.users = this.users.filter((element) => element['id'] != this.actualUser['id']);
            this.deleteModalActive = !this.deleteModalActive;
        });
        
    }

    selectUser(user: any) {
        this.router.navigateByUrl('/entrar', { 'state': user })
    }
}