import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/models/Movie';
import { User } from 'src/models/User';
import { ApiService } from 'src/services/api.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/firebaseServices/user/user.service';

@Component({
  selector: 'app-userLikes',
  templateUrl: './userLikes.component.html',
  styleUrls: ['./userLikes.component.scss']
})
export class UserLikesComponent implements OnInit {
  isLoggedIn: boolean = false;
  userId: string | any;
  user: User | any;
  likesListIds: [] = []
  likesListMovies: Movie[] = []
  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private userser: UserService,
    private apiser: ApiService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn
    this.userId = this.auth.userLoggedID
    this.userser.getUserById(this.userId).subscribe((user) => {
      this.user = { id: user.payload.id, ...(user.payload.data() as {}) };
      this.likesListIds = this.user.likes;
      this.getfLikedList()

    })
  }
  getfLikedList() {
    for (let i = 0; i < this.likesListIds.length; i++) {
      this.apiser.getMovie(this.likesListIds[i]).subscribe((movie) => {
        const found = this.likesListMovies.some(el => el.id === this.likesListIds[i])
        if (!found) this.likesListMovies.push(movie);
      })
    }
  }
  showMovieDetails(movie: Movie) {
    this.router.navigate(['movie', movie.id]);

  }

}
