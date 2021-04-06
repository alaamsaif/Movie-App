import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import * as firebase from 'firebase/app';
import { ChatMessage } from 'src/models/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
 
  constructor( 
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
   
   }
   
  
  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }
  sendMessage(msg: string) {
   
  }


}
