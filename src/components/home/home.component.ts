import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/models/Movie';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showTopRated:boolean= true;
  showUpcoming:boolean=false;
  showNowPlaying:boolean=false;
  ngOnInit() {
  }
  showupcoming(){
    this.showNowPlaying=false;
    this.showTopRated=false;
    this.showUpcoming=true;
  }
  showtoprated(){
    this.showNowPlaying=false;
    this.showUpcoming=false;
    this.showTopRated=true;

  }
  shownowplaying(){
    this.showUpcoming=false;
    this.showTopRated=false;
    this.showNowPlaying=true;

  }

}
