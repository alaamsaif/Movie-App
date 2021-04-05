import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Movie } from 'src/models/Movie';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-movieDeatails',
  templateUrl: './movieDeatails.component.html',
  styleUrls: ['./movieDeatails.component.scss']
})
export class MovieDeatailsComponent implements OnInit {
  movieId :any;
  movie:Movie|any;
  movieYear:any;
  hours:any;
  minutes:any;
  reviewsList:any;
  recommendationsList:Movie[]=[];
  similarMoviesList:Movie[]=[];

  constructor(
    private apiSer:ApiService,
    private activatedroute: ActivatedRoute,
    private router:Router

    ) { }
  ngOnInit() {
    
    this.activatedroute.paramMap.subscribe((params: ParamMap) => {
      let Id: string | null = params.get('id');
      this.movieId = Id;

      this.apiSer.getMovie(this.movieId).subscribe((movie)=>{
        this.movie=movie;
        this.movieYear=movie.release_date.slice(0,4)
        this.hours=Math.floor(movie.runtime/60);
        this.minutes=movie.runtime%60;
      })
  
      this.apiSer.getRecommendations(this.movieId).subscribe((Data)=>{
        //get first 6 recommended movies 
        let recommendationsMovies=Data.results;
        this.recommendationsList=recommendationsMovies.slice(0,6)
      })
      this.apiSer.getSimilarMovies(this.movieId).subscribe((Data)=>{
        
        let similarMovies=Data.results;
        this.similarMoviesList=similarMovies.slice(0,6)
  
      })
  
      this.apiSer.getReviews(this.movieId).subscribe((Data)=>{
        this.reviewsList=Data.results;
        console.log(this.reviewsList)
  
      })
      
    });
    

    

   
  }
  showMovieDetails(movie:Movie){
    this.router.navigate(['movie', movie.id]);
  }

}
