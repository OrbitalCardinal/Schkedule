import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  // Ya que vamos a hacer un redirección si la hora es mayor de 22
  // Necesitamos importar el Router e inyectarlo al construictor
  constructor(private router:Router){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
        let userData = localStorage.getItem('user');
        if(userData == null) {
            this.router.navigate(['']);
            // Si devolvemos FALSE no de permitirá el acceso
            return false;
        } else {
            return true;
        }
        
    }
  
}