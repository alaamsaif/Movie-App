import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/firebaseServices/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn :boolean =false;
  userId:string|any;
  user:User|any;
  constructor(
    private router :Router,
    private auth : AuthenticationService,
    private userser:UserService
    ) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn
    this.userId=this.auth.userLoggedID
    this.userser.getUserById(this.userId).subscribe((user)=>{
      this.user={ id: user.payload.id, ...(user.payload.data() as {}) };
    })
   
  }
  login(){
    this.router.navigate(['/Login']);
  }
  signup(){
    this.router.navigate(['/Register']);
  }
  logout(){
    this.auth.SignOut().then((data)=>{
      this.ngOnInit();
    })
    this.router.navigate(['/topmovies']);
  }

}
