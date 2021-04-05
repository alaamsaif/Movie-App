import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Movie } from 'src/models/Movie';
import { User } from 'src/models/User';
import { ApiService } from 'src/services/api.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/firebaseServices/user/user.service';
declare var $ : any;
@Component({
  selector: 'app-userPage',
  templateUrl: './userPage.component.html',
  styleUrls: ['./userPage.component.scss']
})
export class UserPageComponent implements OnInit ,OnChanges{
  
  isLoggedIn :boolean =false;
  userId:string|any;
  user:User|any;
  showFav:boolean=false;
  showLikes:boolean=false;
  constructor(
    private router :Router,
    private auth : AuthenticationService,
    private userser:UserService,
    private apiser:ApiService
    ) 
  { }
  ngOnChanges(changes: SimpleChanges): void {
   
  }
  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn
    this.userId=this.auth.userLoggedID
    this.userser.getUserById(this.userId).subscribe((user)=>{
      this.user={ id: user.payload.id, ...(user.payload.data() as {}) }

    })
  }
  showFavoritesSection(){
    this.showFav=true;
    this.showLikes=false;
  }
  showLikesSection(){
    this.showFav=false;
    this.showLikes=true;
  }
  showMovieDetails(item:Movie){

  }
  
  
}
