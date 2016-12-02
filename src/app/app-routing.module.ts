import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

const appRoutes: Routes = [
  {path: '', redirectTo: 'songs', pathMatch: 'full'},
  {path: 'playlists', loadChildren: './playlists/playlist.module#PlaylistModule'}
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
