import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { songRoutes } from "./songs/song.routes";
import { playlistRoutes } from "./playlists/playlist.routes";


const appRoutes: Routes = [
  {path: '', redirectTo: '/songs', pathMatch: 'full'},
  ...songRoutes, // .concat(songRoutes)
  ...playlistRoutes
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
