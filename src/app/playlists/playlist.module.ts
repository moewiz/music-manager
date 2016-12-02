import { NgModule } from "@angular/core";
import { PlaylistRoutingModule } from "./playlist.routes";
import { PlaylistsComponent } from "./playlists.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    PlaylistRoutingModule,
    CommonModule,
    FormsModule
  ],
  exports: [],
  declarations: [PlaylistsComponent]
})
export class PlaylistModule {
}
