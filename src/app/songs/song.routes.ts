import {Routes} from "@angular/router";
import {SongsComponent} from "./songs.component";
import {AddNewSongComponent} from "../add-new-song/add-new-song.component";

export const songRoutes:Routes = [
  {path: 'songs', component: SongsComponent},
  {path: 'songs/new', component: AddNewSongComponent},
  {path: 'songs/edit/:name', component: AddNewSongComponent},
]
