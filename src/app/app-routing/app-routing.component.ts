import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {SongsComponent} from "../songs/songs.component";
import {AddNewSongComponent} from "../add-new-song/add-new-song.component";
import {PlaylistsComponent} from "../playlists/playlists.component";


const appRoutes:Routes = [
  {path: 'songs', component: SongsComponent, name: 'Songs', default: true},
  {
    path: 'songs/new',
    component: AddNewSongComponent,
    name: 'AddSong',
    data: {
      title: 'Adddd Songggg'
    }
  },
  {path: 'playlists', component: PlaylistsComponent, name: 'Playlists'}
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
