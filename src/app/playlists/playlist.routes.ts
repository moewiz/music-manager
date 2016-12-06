import { Routes, RouterModule } from "@angular/router";
import { PlaylistsComponent } from "./playlists.component";
import { NgModule } from "@angular/core";
import { PlaylistFormComponent } from "./playlist-form.component";

const playlistRoutes: Routes = [
  {path: '', component: PlaylistsComponent},
  {path: 'new', component: PlaylistFormComponent},
  {path: 'edit/:name', component: PlaylistFormComponent},
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
