import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private firestore: AngularFirestore) { }
  getUserById(userId: any) {
    return this.firestore.collection('users').doc(userId).snapshotChanges();
  }

  // updateWishlistByUserID(prds: any, forID: any) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`wishlist/${forID}`);
  //     const userState: WishListModel = {
  //       productsIDs: prds
  //     }

  //     return userRef.set(userState, {
  //       merge: true
  //     })
  // }


}
