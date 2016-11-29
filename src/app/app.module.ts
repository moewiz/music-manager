import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { SongsComponent } from './songs/songs.component';
import { SongFormComponent } from './song-form/song-form.component';
import { PlaylistsComponent } from './playlists/playlists.component';

const appRoutes: Routes = [
  { path: 'songs', component: SongsComponent },
  { path: 'playlists', component: PlaylistsComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SongFormComponent,
    PlaylistsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
