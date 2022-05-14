import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'config-page',
    templateUrl: './config-page.component.html',
    styleUrls: ['./config-page.component.scss', 
                '../global-pages-styles/top-bar-styles.scss',
                 '../global-pages-styles/ball-atom.scss',
                '../global-pages-styles/global.styles.scss']
})

export class ConfigPageComponent implements OnInit {
    
    constructor(private http: HttpClient, private authSvc: AuthService) {}

    userData: any;
    userObjectId: any;
    isLoading: Boolean = true;
    ngOnInit(): void {
        setTimeout(() => {
            this.userData = JSON.parse(localStorage.getItem('user')!);
            console.log(this.userData);
    
            // Extraer id de objeto de usuario una sola vez
            this.http.get(`https://schkedule-default-rtdb.firebaseio.com/usuarios.json?orderBy="id_usuario"&equalTo="${this.userData['id_usuario']}"`).subscribe(result => {
                    this.userObjectId =  Object.keys(result)[0];
                    this.isLoading = false;
            });
        }, 700)
    }
    
    editName(title:any, previousValue: any, input: any) {
        let patchFunction = (field: any, newValue: any) => {
            this.userData[field] = newValue;
            this.http.patch(`https://schkedule-default-rtdb.firebaseio.com/usuarios/${this.userObjectId}.json`, this.userData).subscribe(resultPatch => {
                localStorage.setItem('user', JSON.stringify(this.userData));
            });
        }
        this.openSwal(title, previousValue, input, patchFunction, 'nombre_completo');
    }

    editStatus(title: any, previousValue: any, input: any) {
        let patchFunction = (field: any, newValue: any) => {
            if(newValue == 0) {
                newValue = 'Estudiante'
            } else {
                newValue = 'Trabajador'
            }
            this.userData[field] = newValue;
            this.http.patch(`https://schkedule-default-rtdb.firebaseio.com/usuarios/${this.userObjectId}.json`, this.userData).subscribe(resultPatch => {
                localStorage.setItem('user', JSON.stringify(this.userData));
            });
        }
        this.openSwal(title, previousValue, input, patchFunction, 'estatus');
    }

    openSwal(title:any, previousValue: any, input: any, patchFunction: any, editField: any) {
        Swal.fire({
            title: title,
            input: input,
            inputOptions: ['Estudiante', 'Trabajador'],
            inputValue: previousValue,
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Cambiar',
            cancelButtonText:  'Cancelar',
            showLoaderOnConfirm: true,
            preConfirm: (value) => {
                patchFunction(editField, value);
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Se cambió correctamente',
                    '',
                    'success'
                  ).then(() => {
                    window.location.reload();
                  })
            }
          })
    }

    recoverPassword() {
        Swal.fire({
          title: 'Introduzca su correo electrónico registrado',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Restablecer contraseña',
          showLoaderOnConfirm: true,
          preConfirm: async (email) => {
            try{
              await this.authSvc.resetPassword(email);
            }catch(error){
              console.log(error);
            }
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Enviamos instrucciones de restablecimiento de contraseña a su correo',
            })
          }
        })
      }
}