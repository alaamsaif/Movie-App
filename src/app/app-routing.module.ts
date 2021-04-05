import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatAccountComponent } from 'src/components/creat-account/creat-account.component';
import { HomeComponent } from 'src/components/home/home.component';
import { LoginComponent } from 'src/components/login/login.component';
import { MovieDeatailsComponent } from 'src/components/movieDeatails/movieDeatails.component';
import { NotFoundComponent } from 'src/components/notFound/notFound.component';
import { NowPlayingMoviesComponent } from 'src/components/nowPlayingMovies/nowPlayingMovies.component';
import { TopRatedMoviesComponent } from 'src/components/topRatedMovies/topRatedMovies.component';
import { UpcomingMoviesComponent } from 'src/components/upcomingMovies/upcomingMovies.component';

const routes: Routes = [
  {path :'Home',component:HomeComponent},
  {path :'Register',component:CreatAccountComponent},
  {path :'Login',component:LoginComponent },
  {path :'movie/:id',component:MovieDeatailsComponent},
  {path :'topmovies',component:TopRatedMoviesComponent},
  {path:'upcomingmovies',component:UpcomingMoviesComponent},
  {path:'nowplayingmovies',component:NowPlayingMoviesComponent},
  {path:"",redirectTo:'Home',pathMatch:'full'},
  {path:"**", component:NotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
