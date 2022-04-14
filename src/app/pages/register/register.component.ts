import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../providers/custom-validators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
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

  constructor(private authService: AuthService) {
    this.registerForm = this.createFormGroup();
  }


  ngOnInit(): void { }

  CheckIn() {

    if (this.registerForm.valid) {
      const email = this.registerForm.value['email']
      const password = this.registerForm.value['password']

      console.log(email, password)
      this.authService.register(email, password).then(res => {

        if (res === null) {
          Swal.fire('','Error al registrar usuario','error')
        } else {
          console.log("Respuesta:", res)
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

}
