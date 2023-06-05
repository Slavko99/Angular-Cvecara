import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    public angularFireStore: AngularFirestore,
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.angularFireAuth.authState.subscribe((user)=>{
      if(user){
        this.userData= user;
        localStorage.setItem('user', JSON.stringify(this.userData));

      }
      else{
        localStorage.setItem('user', 'null');
      }
    })
   }
  SignUp(email: string, password: string){
    return this.angularFireAuth
    .createUserWithEmailAndPassword(email, password)
    .then((result)=>{
      this.SendVerificationMail();
      this.SetUserData(result.user);
    })
    .catch((error) =>{
      window.alert(error.message);
    });
  }
  SendVerificationMail(){
    return this.angularFireAuth.currentUser
    .then((u: any) => u.sendEmailVerification())
  }

  SetUserData(user: any){
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(
      `users/${user.uid}`
    );
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,

        emailVerified: user.emailVerified,
      };

      this.userData= user;

      return userRef.set(userData,{
        merge: true,
      })
  }
  SignIn(email: string, password: string){
    return this.angularFireAuth 
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.SetUserData(result.user);
      this.router.navigate(['shop'])  
    })
    .catch((error) => {
      window.alert(error.message);
    })
  }

  get isLoggedIn(): boolean{
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  getToken(){
    const user = JSON.parse(localStorage.getItem('user')!);
    const token = user !== null ? user.stsTokenManager.accessToken : null;
    return token;
  }
  signOut(){
    return this.angularFireAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      this.router.navigate(['Login']);
    })
  }
}
