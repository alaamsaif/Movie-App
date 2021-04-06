import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/models/Movie';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  listOfPopularMovies:Movie[]=[];
  listOfTrendingMovies:Movie[]=[];
  constructor(private router :Router,
    private apiser:ApiService
    ){}
  ngOnInit() {
    this.apiser.getPopular().subscribe((movies) => {
      this.listOfPopularMovies = movies.results; 
    })
    this.apiser.getTrending().subscribe((movies) => {
      this.listOfTrendingMovies = movies.results;
      
    })
  }

  showMovieDetails(movie:Movie){
    this.router.navigate(['movie', movie.id]);

  }

}
