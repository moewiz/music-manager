import { Routes, RouterModule } from "@angular/router";
import { SongsComponent } from "./songs.component";
import { AddNewSongComponent } from "../add-new-song/add-new-song.component";
import { NgModule } from "@angular/core";

const songRoutes: Routes = [
  {path: 'songs', component: SongsComponent},
  {path: 'songs/new', component: AddNewSongComponent},
  {path: 'songs/edit/:name', component: AddNewSongComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(songRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SongRoutingModule {
}
