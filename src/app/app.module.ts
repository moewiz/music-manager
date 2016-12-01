import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SongsComponent } from './songs/songs.component';
import { SongFormComponent } from './song-form/song-form.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { AddNewSongComponent } from './add-new-song/add-new-song.component';
import { AppRoutingComponent } from './app-routing.component';

@NgModule({
  declarations: [
    AppComponent,
    SongsComponent,
    SongFormComponent,
    PlaylistsComponent,
    AddNewSongComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
