import { Routes, RouterModule } from "@angular/router";
import { PlaylistsComponent } from "./playlists.component";
import { NgModule } from "@angular/core";

const playlistRoutes: Routes = [
  {path: '', component: PlaylistsComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(playlistRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PlaylistRoutingModule {
}
