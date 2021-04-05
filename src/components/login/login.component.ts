import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string='';
  password:string='';
  constructor(
    private auth:AuthenticationService,
    private router :Router
    ) { }

  ngOnInit(): void {
  }
  login(){
    this.auth.SignIn(this.email, this.password);
    this.router.navigate(['/userpage']);
  }
}
