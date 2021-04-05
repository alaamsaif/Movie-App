import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/models/Movie';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-movieDeatails',
  templateUrl: './movieDeatails.component.html',
  styleUrls: ['./movieDeatails.component.scss']
})
export class MovieDeatailsComponent implements OnInit {
  movie:Movie|any;
  movieYear:any;
  hours:any;
  minutes:any;
  reviewsList:any;
  recommendationsList:Movie[]=[];
  similarMoviesList:Movie[]=[];

  constructor(private apiSer:ApiService) { }
  ngOnInit() {

    this.apiSer.getMovie(19404).subscribe((movie)=>{
      this.movie=movie;
      this.movieYear=movie.release_date.slice(0,4)
      this.hours=Math.floor(movie.runtime/60);
      this.minutes=movie.runtime%60;
    })

    this.apiSer.getRecommendations(19404).subscribe((Data)=>{
      //get first 6 recommended movies 
      let recommendationsMovies=Data.results;
      this.recommendationsList=recommendationsMovies.slice(0,6)
    })
    this.apiSer.getSimilarMovies(19404).subscribe((Data)=>{
      
      let similarMovies=Data.results;
      this.similarMoviesList=similarMovies.slice(0,6)

    })

    this.apiSer.getReviews(19404).subscribe((Data)=>{
      this.reviewsList=Data.results;
      console.log(this.reviewsList)

    })

   
  }

}
