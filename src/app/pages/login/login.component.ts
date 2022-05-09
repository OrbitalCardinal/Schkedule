import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./new-login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm= new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })


constructor(private authSvc: AuthService, private router:Router, private http: HttpClient){}

  ngOnInit(): void {
  }

 async onLogin() {

    if(this.loginForm.valid) {
      console.log(this.loginForm.value);
      const {email, password} = this.loginForm.value;
      try{
      const user: any | undefined =  await this.authSvc.login(email, password);
      if(user) {
          console.log(user);
          let id_usuario = user['user']['uid'];
          this.http.get(`https://schkedule-default-rtdb.firebaseio.com/usuarios.json?orderBy="id_usuario"&equalTo="${id_usuario}"`).subscribe(response => {
              let userData = Object.values(response)[0];
              console.log(userData);
              localStorage.setItem('user', JSON.stringify(userData));
          })
          //Redirecciona a la homepage
          this.router.navigate(['/mainpage/home']);
          Swal.fire('¡Bienvenido devuelta!', '', 'success')
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error de autenticación',
            text: 'Correo o contraseña incorrecta, intentelo de nuevo',
          });
        }
      }
      catch(error) {
        console.log(error)
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'Verifique los campos y vuelva a intentarlo',
      });
    }
    
  }

  recoverPassword() {
    Swal.fire({
      title: 'Introduzca su correo electrónico registrado',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Recuperar contraseña',
      showLoaderOnConfirm: true,
      preConfirm: async (email) => {
        try{
          await this.authSvc.resetPassword(email);
          this.router.navigate(['/login'])
        }catch(error){
          console.log(error);
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Enviamos instrucciones de recuperación a su correo',
        })
      }
    })
  }

}
