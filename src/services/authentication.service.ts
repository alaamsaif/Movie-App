import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/models/User';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userState: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private toastr: ToastrService
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userState = user;
        localStorage.setItem('user', JSON.stringify(this.userState));
        const userJson = localStorage.getItem('user');
        if(userJson != null){
          JSON.parse(userJson)
        }
      } else {
        // localStorage.setItem('user', null);
        // JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          console.log("signIn")
        });
        //this.SetUserData(result.user);
      }).catch((error) => {
        this.toastr.error(`${error.message}`, 'Error', {
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      })
  }
  SignUp(user: User) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        this.SetUserData(user, result.user);
      }).catch((error) => {
        this.toastr.error(`${error.message}`, 'Error', {
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      })
  }
  SetUserData(user: User, forID: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${forID.uid}`);
    const userState: User = {
      uid: forID.uid,
      email: user.email,
      password: user.password,
      userName: user.userName,
    }
    return userRef.set(userState, {
      merge: true
    })

  }
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
  })
  }  

}
