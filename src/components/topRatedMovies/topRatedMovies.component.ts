import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/models/Movie';
import { ApiService } from 'src/services/api.service';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-topRatedMovies',
  templateUrl: './topRatedMovies.component.html',
  styleUrls: ['./topRatedMovies.component.scss']
})
export class TopRatedMoviesComponent implements OnInit {
  page:number = 1;
  listOfMovies: Movie[] = [];
  constructor(
    private apiService: ApiService,
    private route: Router,

    ) { }

  ngOnInit() {
    this.apiService.getTopRated(this.page).subscribe((movies) => {
      this.listOfMovies = movies.results;
      
    })
  }
  getMoreTopRated(){
    this.page = this.page+1;
    this.apiService.getTopRated(this.page).subscribe((Data) => {
      if(this.page <= Data.total_pages)
      {
        this.listOfMovies = this.listOfMovies.concat(Data.results);
      }
      
    })
  }
  showMovieDetails(movie:Movie){
    this.route.navigate(['movie', movie.id]);

  }
  

}
