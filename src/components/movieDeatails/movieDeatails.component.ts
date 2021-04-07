import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Movie } from 'src/models/Movie';
import { User } from 'src/models/User';
import { ApiService } from 'src/services/api.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/firebaseServices/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';

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
  likesListIds: any;
  isFav: boolean = false;
  isLiked: boolean = false;
  showAllText: boolean = false;
  showSmallText: boolean = true;

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
        this.likesListIds = this.user.likes;
        for (var movie in this.favoritesListIds) {
          if (this.favoritesListIds[movie] == this.movieId) {
            this.isFav = true;

          }
        }
        for (var movie in this.likesListIds) {
          if (this.likesListIds[movie] == this.movieId) {
            this.isLiked = true;

          }
        }
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
        this.recommendationsList = Data.results;
      })
      this.apiSer.getSimilarMovies(this.movieId).subscribe((Data) => {
        this.similarMoviesList = Data.results;

      })

      this.apiSer.getReviews(this.movieId).subscribe((Data) => {
        this.reviewsList = Data.results;

      })

    });

  }
  
  addtofav() {
    if (this.auth.isLoggedIn === true) {
     
      if (this.isFav === false) {
        let theMovies = [...this.favoritesListIds];
        theMovies.push(Number(this.movieId));
        this.userser.updatefavoritesList(theMovies, this.userId)
        this.toastr.success(`Mark as favorite`, 'Done', {
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
       
        this.isFav = true;
      }
      else if (this.isFav === true) {

        let thomovies = [...this.favoritesListIds];
        thomovies=thomovies.filter((el)=>el!=this.movieId)
        this.userser.updatefavoritesList(thomovies, this.userId).then((data)=>{
          this.reloadComponent()
         
        });        
        this.toastr.success(`Remove from favorite`, 'Done', {
          closeButton: true,
          timeOut: 5000,
          progressBar: true
        });
      }
    }
    else {
      this.toastr.error(`You need to login first.`, 'Error', {
        closeButton: true,
        timeOut: 5000,
        progressBar: true
      });

    }
  }
  
  addtolikes() {
    if (this.auth.isLoggedIn === true) {
     if(this.isLiked===false){
      let theMovies = [...this.likesListIds];
      theMovies.push(Number(this.movieId));
      this.userser.updatefLikesList(theMovies, this.userId)
      this.toastr.success(`you might like the Recommedtions`, 'take a look', {
        closeButton: true,
        timeOut: 5000,
        progressBar: true
      });
     }
    }
    else {
      this.toastr.error(`You need to login first.`, '', {
        closeButton: true,
        timeOut: 5000,
        progressBar: true
      });

    }
  }
  showMovieDetails(movie: Movie) {
    this.router.navigate(['movie', movie.id]);
  }
  showtext() {
    this.showAllText = true;
    this.showSmallText = false
  }
  hidetext() {
    this.showAllText = false;
    this.showSmallText = true;
  }
  reloadComponent(){
    let currenturl= this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute=()=>false;
    this.router.onSameUrlNavigation='reload';
    this.router.navigate([currenturl]);
  }

}
