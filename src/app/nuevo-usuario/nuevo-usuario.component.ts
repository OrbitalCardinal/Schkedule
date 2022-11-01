import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'nuevo-usuario',
    templateUrl: './nuevo-usuario.component.html',
    styleUrls: ['./nuevo-usuario.component.scss']
})

export class NuevoUsuarioComponent {

    constructor(private http: HttpClient, private router: Router) {}

    onSubmit(formData: NgForm) {
        let data = formData.value;

        if(data['contrasena'] != data['confirmarContrasena']) return;
        
        // this.http.post('http://localhost:3000/usuarios', {
        //     'nombres': data['nombres'],
        //     'apellidos': data['apellidos'],
        //     'correo': data['correo'],
        //     'contrasena': data['contrasena']
        // }).subscribe((result) => {
        //     console.log(result);
        // });
        this.router.navigateByUrl('/seleccion-usuario')
    }
}