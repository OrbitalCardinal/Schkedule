import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm= new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })


constructor(private authSvc: AuthService, private router:Router){}

  ngOnInit(): void {
  }

 async onLogin(){
    const {email, password} = this.loginForm.value;
    try{
     const user =  await this.authSvc.login(email, password);
     if(user){
      //Redirecciona a la homepage
      this.router.navigate(['/mainpage/home']);
     }
    }
    catch(error){console.log(error)}
  }

}
