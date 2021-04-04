import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/models/Movie';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-upcomingMovies',
  templateUrl: './upcomingMovies.component.html',
  styleUrls: ['./upcomingMovies.component.scss']
})
export class UpcomingMoviesComponent implements OnInit {

  page: number = 1;
  listOfMovies: Movie[] = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUpcoming(this.page).subscribe((Data) => {
      this.listOfMovies = Data.results;
    })
  }
  getMoreUpcoming(){
    this.page = this.page+1;
    this.apiService.getUpcoming(this.page).subscribe((Data) => {
      if(this.page <= Data.total_pages)
      {
        this.listOfMovies = this.listOfMovies.concat(Data.results);
      }
      console.log(this.listOfMovies)
    })
  }

}
