import { NgModule } from "@angular/core";
import { SongRoutingModule } from "./song.routes";
import { SongsComponent } from "./songs.component";
import { AddNewSongComponent } from "../add-new-song/add-new-song.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { JsonpModule } from '@angular/http';
import { MySharedModule } from '../my-shared-module/my-shared.module';

@NgModule({
  imports: [
    SongRoutingModule,
    CommonModule,
    FormsModule,
    JsonpModule,
    MySharedModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    SongsComponent,
    AddNewSongComponent
  ]
})
export class SongModule {
}
