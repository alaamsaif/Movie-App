import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/models/Movie';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-nowPlayingMovies',
  templateUrl: './nowPlayingMovies.component.html',
  styleUrls: ['./nowPlayingMovies.component.scss']
})
export class NowPlayingMoviesComponent implements OnInit {
  page:number = 1;
  listOfMovies: Movie[] = [];
  constructor(private apiService: ApiService) { }
 

  ngOnInit() {
    this.apiService.getNowPlaying(this.page).subscribe((movies) => {
      this.listOfMovies = movies.results;
      console.log(this.listOfMovies)
    })
  }

  getMoreNowPlaying(){
    this.page = this.page+1;
    this.apiService.getNowPlaying(this.page).subscribe((Data) => {
      if(this.page <= Data.total_pages)
      {
        this.listOfMovies = this.listOfMovies.concat(Data.results);
      }
      console.log(this.listOfMovies)
    })
  }

}
