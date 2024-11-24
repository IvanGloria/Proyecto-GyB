import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly GyBAuth : AngularFireAuth ) { }

  public login(email: string, password: string){
    return new Promise((resolve, reject) => {
      this.GyBAuth.signInWithEmailAndPassword(email, password)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
    })
  }

  public isAuth(){
    return new Promise((resolve, reject) => {
      this.GyBAuth.currentUser.then((res) => {
        if(res?.uid){
          resolve(true);
        }else {
          resolve(false);
        }
      })
    })
  }
}
