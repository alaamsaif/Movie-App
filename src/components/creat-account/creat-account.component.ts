import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-creat-account',
  templateUrl: './creat-account.component.html',
  styleUrls: ['./creat-account.component.scss']
})
export class CreatAccountComponent implements OnInit {
  password:string = '';
  email:string = '';
  username:string ='';
  user: User ={
    password:'',
    email:'',
    username:''
  };

  constructor(
    private auth:AuthenticationService,
    private router :Router
    ) { }
  ngOnInit(): void {
  }
  addUser(){
    this.user={
      email: this.email,
      password: this.password,
      username: this.username,
    }
    this.auth.SignUp(this.user);
    this.router.navigate(['/userpage']);
    
  }

}
