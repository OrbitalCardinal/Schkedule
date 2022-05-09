import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  constructor(private authSvc: AuthService, private router: Router) {}
  userData = JSON.parse(localStorage.getItem('user')!);

  ngOnInit() {
    console.log(this.userData);
  }

  async onLogout() {
    try {
      await this.authSvc.logout();
      //Redirecciona a la homepage
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
  }
}
