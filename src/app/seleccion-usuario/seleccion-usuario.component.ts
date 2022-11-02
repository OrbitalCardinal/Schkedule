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

    ngOnInit(): void {
        this.http.get('http://localhost:3000/usuarios').subscribe((result: any[]) => {
            this.users = result;
        });
    }

    deleteUser(user: any) {
        this.http.delete(`http://localhost:3000/usuarios?id=${user['id']}`).subscribe((result) => {
            console.log(result);
        });
        
        this.users = this.users.filter((element) => element['id'] != user['id']);
    }

    selectUser(user: any) {
        this.router.navigateByUrl('/entrar', { 'state': user })
    }
}