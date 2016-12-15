import { Routes, RouterModule } from "@angular/router";
import { SongsComponent } from "./songs.component";
import { AddNewSongComponent } from "../add-new-song/add-new-song.component";
import { NgModule } from "@angular/core";

const songRoutes: Routes = [
  {path: '', component: SongsComponent},
  {path: 'new', component: AddNewSongComponent},
  {path: 'edit/:id', component: AddNewSongComponent},
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
