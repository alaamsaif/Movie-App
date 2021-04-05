import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private firestore: AngularFirestore,
    public afs: AngularFirestore
  ) { }
  getUserById(userId: any) {
    return this.firestore.collection('users').doc(userId).snapshotChanges();
  }
  updatefavoritesList(movies: any, id: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${id}`);
    const userState: any = {
      favorites: movies
    }
    return userRef.set(userState, {
      merge: true
    })
  }
  updatefLikesList(movies: any, id: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${id}`);
    const userState: any = {
      likes: movies
    }
    return userRef.set(userState, {
      merge: true
    })
  }


}
