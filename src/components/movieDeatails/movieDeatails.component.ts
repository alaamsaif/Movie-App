import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Movie } from 'src/models/Movie';
import { User } from 'src/models/User';
import { ApiService } from 'src/services/api.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/firebaseServices/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movieDeatails',
  templateUrl: './movieDeatails.component.html',
  styleUrls: ['./movieDeatails.component.scss']
})
export class MovieDeatailsComponent implements OnInit {
  isLoggedIn: boolean = false;
  userId: string | any;
  user: User | any;
  movieId: any;
  movie: Movie | any;
  movieYear: any;
  hours: any;
  minutes: any;
  reviewsList: any;
  recommendationsList: Movie[] = [];
  similarMoviesList: Movie[] = [];
  favoritesListIds: any;

  constructor(
    private auth: AuthenticationService,
    private apiSer: ApiService,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private userser: UserService,
    private toastr: ToastrService

  ) { }
  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn
    this.userId = this.auth.userLoggedID
    if (this.auth.isLoggedIn === true) {
      this.userser.getUserById(this.userId).subscribe((user) => {
        this.user = { id: user.payload.id, ...(user.payload.data() as {}) };
        this.favoritesListIds = this.user.favorites;
      })
    }
    this.activatedroute.paramMap.subscribe((params: ParamMap) => {
      let Id: string | null = params.get('id');
      this.movieId = Id;

      this.apiSer.getMovie(this.movieId).subscribe((movie) => {
        this.movie = movie;
        this.movieYear = movie.release_date.slice(0, 4)
        this.hours = Math.floor(movie.runtime / 60);
        this.minutes = movie.runtime % 60;
      })

      this.apiSer.getRecommendations(this.movieId).subscribe((Data) => {
        //get first 6 recommended movies 
        let recommendationsMovies = Data.results;
        this.recommendationsList = recommendationsMovies.slice(0, 6)
      })
      this.apiSer.getSimilarMovies(this.movieId).subscribe((Data) => {

        let similarMovies = Data.results;
        this.similarMoviesList = similarMovies.slice(0, 6)

      })

      this.apiSer.getReviews(this.movieId).subscribe((Data) => {
        this.reviewsList = Data.results;
        console.log(this.reviewsList)
      })

    });

  }
  addtofav() {
    if (this.auth.isLoggedIn === true) {
      let theMovies = [...this.favoritesListIds];
      theMovies.push(Number(this.movieId));
      this.userser.updatefavoritesList(theMovies, this.userId)
      this.toastr.success(`Mark as favorite`, 'Done', {
        closeButton: true,
        timeOut: 5000,
        progressBar: true
      });
    }
    else {
      this.toastr.error(`You need to login first.`, 'Error', {
        closeButton: true,
        timeOut: 5000,
        progressBar: true
      });

    }
  }
  showMovieDetails(movie: Movie) {
    this.router.navigate(['movie', movie.id]);
  }

}
