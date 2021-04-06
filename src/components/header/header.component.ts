import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/firebaseServices/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit ,OnChanges{
  isLoggedIn: boolean = false;
  userId: string | any;
  user: User | any;
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private userser: UserService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
   console.log("on change")
  }

  ngOnInit() {
    console.log("iam in header")
    if (this.auth.isLoggedIn === true) {
      console.log("the user id = ")
      console.log(this.auth.userLoggedID)
      this.isLoggedIn = this.auth.isLoggedIn
      this.userId = this.auth.userLoggedID
      this.userser.getUserById(this.userId).subscribe((user) => {
        this.user = { id: user.payload.id, ...(user.payload.data() as {}) };
      })
    }

  }
  login() {
    this.router.navigate(['/Login']);
  }
  signup() {
    this.router.navigate(['/Register']);
  }
  logout() {
    this.auth.SignOut().then((data) => {
     window.location.reload();
    })
    
  }

}
