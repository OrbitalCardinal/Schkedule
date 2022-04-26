import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


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


constructor(private authSvc: AuthService, private router:Router, private http: HttpClient){}

  ngOnInit(): void {
  }

 async onLogin(){
    const {email, password} = this.loginForm.value;
    try{
     const user: any | undefined =  await this.authSvc.login(email, password);
     if(user){
         console.log(user);
         let id_usuario = user['user']['uid'];
         this.http.get(`https://schkedule-default-rtdb.firebaseio.com/usuarios.json?orderBy="id_usuario"&equalTo="${id_usuario}"`).subscribe(response => {
             let userData = Object.values(response)[0];
             console.log(userData);
             localStorage.setItem('user', JSON.stringify(userData));
         })
      //Redirecciona a la homepage
      this.router.navigate(['/mainpage/home']);
     }
    }
    catch(error){console.log(error)}
  }

}
