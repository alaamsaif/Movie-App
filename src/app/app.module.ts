import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { LoginComponent } from 'src/components/login/login.component';
import { CreatAccountComponent } from 'src/components/creat-account/creat-account.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from 'src/components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { TopRatedMoviesComponent } from 'src/components/topRatedMovies/topRatedMovies.component';
import { UpcomingMoviesComponent } from 'src/components/upcomingMovies/upcomingMovies.component';
import { NowPlayingMoviesComponent } from 'src/components/nowPlayingMovies/nowPlayingMovies.component';
import { MovieDeatailsComponent } from 'src/components/movieDeatails/movieDeatails.component';
import { NotFoundComponent } from 'src/components/notFound/notFound.component';
import { HeaderComponent } from 'src/components/header/header.component';
import { UserPageComponent } from 'src/components/userPage/userPage.component';
import { UserFavoritesComponent } from 'src/components/userFavorites/userFavorites.component';
import { UserLikesComponent } from 'src/components/userLikes/userLikes.component';
import { ChatFormComponent } from 'src/components/chat-form/chat-form.component';
import { ChatroomComponent } from 'src/components/chatroom/chatroom.component';
import { FeedComponent } from 'src/components/feed/feed.component';
import { MessageComponent } from 'src/components/message/message.component';
import { UserItemComponent } from 'src/components/user-item/user-item.component';
import { UserListComponent } from 'src/components/user-list/user-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreatAccountComponent,
    HomeComponent,
    TopRatedMoviesComponent,
    UpcomingMoviesComponent,
    NowPlayingMoviesComponent,
    MovieDeatailsComponent,
    NotFoundComponent,
    HeaderComponent,
    UserPageComponent,
    UserFavoritesComponent,
    UserLikesComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    UserItemComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
