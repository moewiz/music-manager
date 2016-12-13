import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from './home.component';
const appRoutes: Routes = [
  // {path: '', redirectTo: 'songs', pathMatch: 'full'},
  // { path: '', loadChildren: './home.module#HomeModule' },
  { path: '', component: HomeComponent },
  { path: 'songs', loadChildren: './songs/song.module#SongModule' },
  { path: 'playlists', loadChildren: './playlists/playlist.module#PlaylistModule' }
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
