import { NgModule } from "@angular/core";
import { PlaylistRoutingModule } from "./playlist.routes";
import { PlaylistsComponent } from "./playlists.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PlaylistFormComponent } from "./playlist-form.component";

@NgModule({
  imports: [
    PlaylistRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    PlaylistsComponent,
    PlaylistFormComponent
  ]
})
export class PlaylistModule {
}
