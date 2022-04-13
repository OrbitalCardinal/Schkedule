import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    estatus: 'Trabajador',
    terminos: ''
  }

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
  }

  CheckIn() {
    console.log(this.user)

    // const { email, password } = this.user
    // this.authService.register(email, password).then(res => {
    //   console.log("Respuesta:", res)
    // });

  }

}
