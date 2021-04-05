import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/models/Movie';
import { User } from 'src/models/User';
import { ApiService } from 'src/services/api.service';
import { AuthenticationService } from 'src/services/authentication.service';
import { UserService } from 'src/services/firebaseServices/user/user.service';

@Component({
  selector: 'app-userFavorites',
  templateUrl: './userFavorites.component.html',
  styleUrls: ['./userFavorites.component.scss']
})
export class UserFavoritesComponent implements OnInit{

  isLoggedIn :boolean =false;
  userId:string|any;
  user:User|any;
  favoritesListIds:[]=[];
  favoritesListMovies:Movie[]=[];

  constructor(
    private router :Router,
    private auth : AuthenticationService,
    private userser:UserService,
    private apiser:ApiService
    ) 
  { }
  
  
  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn
    this.userId=this.auth.userLoggedID
    this.userser.getUserById(this.userId).subscribe((user)=>{
      this.user={ id: user.payload.id, ...(user.payload.data() as {}) };
      this.favoritesListIds=this.user.favorites;
      this.getfavoritesList()

    })
  }
  getfavoritesList(){
    for(let i=0;i<this.favoritesListIds.length;i++){
      this.apiser.getMovie(this.favoritesListIds[i]).subscribe((movie)=>{
        const found = this.favoritesListMovies.some(el => el.id ===this.favoritesListIds[i])
        if(!found)  this.favoritesListMovies.push(movie);
      })
    }
  }
  showMovieDetails(movie:Movie){
    this.router.navigate(['movie', movie.id]);

  }

}
