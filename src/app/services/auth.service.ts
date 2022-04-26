import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'

import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(public auth: AngularFireAuth) {

  }

  async register(email: string, password: string) {
    try {

      return await this.auth.createUserWithEmailAndPassword(email, password)

    } catch (error) {
      console.log("Error: ", error)
      return null
    }
  }

  async login(email: string, password: string) {
    try {
      return await this.auth.signInWithEmailAndPassword(email, password)

    } catch (error) {
      console.log(error)
      return null
    }
  }

  async logout () {
    try{
      await this.auth.signOut();
  }catch(error){console.log(error)}
  }

  async resetPassword(email:string): Promise<void>{
    try{
        return this.auth.sendPasswordResetEmail(email);
    }
    catch(error){console.log(error)}

  }



}
