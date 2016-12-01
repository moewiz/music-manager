import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {SongsComponent} from "./songs/songs.component";
import {AddNewSongComponent} from "./add-new-song/add-new-song.component";
import {PlaylistsComponent} from "./playlists/playlists.component";


const appRoutes:Routes = [
  {path: 'songs', component: SongsComponent},
  {path: 'songs/new', component: AddNewSongComponent},
  {path: 'songs/edit/:name', component: AddNewSongComponent},
  {path: 'playlists', component: PlaylistsComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingComponent {
}
