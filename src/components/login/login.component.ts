import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email:string='';
  password:string='';
  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
  }
  login(){
    this.auth.SignIn(this.email, this.password);
  }
}
