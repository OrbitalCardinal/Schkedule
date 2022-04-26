import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']

})
export class ForgotPasswordComponent implements OnInit {

  userEmail = new FormControl('');
 constructor(private authSvc:AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onReset(){
    try{
      const email = this.userEmail.value;
      await this.authSvc.resetPassword(email);
      window.alert('Correo enviado, revisa tu bandeja tu bandeja de entrada');
      this.router.navigate(['/login'])
    }catch(error){
      console.log(error);
    }

  }

}
