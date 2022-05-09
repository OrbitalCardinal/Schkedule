import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../providers/custom-validators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./new-register.component.scss']
})
export class RegisterComponent implements OnInit {

  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
      estatus: new FormControl('Estudiante'),
      terminos: new FormControl('', [Validators.required, Validators.requiredTrue])
    },
      CustomValidators.mustMatch('password', 'passwordConfirm')
    );
  }

  public registerForm: FormGroup;

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get passwordConfirm() { return this.registerForm.get('passwordConfirm'); }
  get estatus() { return this.registerForm.get('estatus'); }
  get terminos() { return this.registerForm.get('terminos'); }

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = this.createFormGroup();
  }


  ngOnInit(): void { }

  CheckIn() {
    if (this.registerForm.valid) {
      const email = this.registerForm.value['email']
      const password = this.registerForm.value['password']

      this.authService.register(email, password).then(res => {

        if (res === null) {
          Swal.fire('', 'Error al registrar usuario', 'error')
        } else {

          console.log("Respuesta:", res)
          const uid = res?.user?.uid || "";

          this.AddUserDataInRealtimeDatabase(uid);
          Swal.fire('¡Gracias!', '¡Usuario registrado correctamente!', 'success')
        }
      });

    } else {
      console.log('Error, form no valido')
    }
  }

  onResetForm() {
    this.registerForm.reset();
  }

  AddUserDataInRealtimeDatabase(uid: string) {

    const url_api = "https://schkedule-default-rtdb.firebaseio.com/";
    const date: Date = new Date();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Access-Control-Allow-Origin", "*");
    myHeaders.append("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
    myHeaders.append("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");

    const data = {
      correo_vinculado: this.registerForm.value['email'],
      exp: 0,
      fecha_registro: date,
      id_usuario: uid,
      nivel: 0,
      nombre_completo: this.registerForm.value['name'],
      premium: false,
      estatus: this.registerForm.value['estatus'],
      terminos: this.registerForm.value['terminos'],
    }

    let params: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: 'follow'
    };

    fetch(`${url_api}usuarios.json`, params)
      .then(response => response.text())
      .then((result) => {
        // Save in local storage user info
        localStorage.setItem('user', JSON.stringify(data))
        console.log(result)
        this.router.navigate(['/mainpage/home']);
        
      })
      .catch(error => console.log('error', error));

  }

}
