import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  imports: [
    BrowserModule, // rootModule import BrowserModule and others module import CommonModule (to uses ngIf, ...)
    FormsModule,
    HttpModule,
    AppRoutingModule,
    // SongModule
  ],
  declarations: [AppComponent],
  providers: [], // shared modules, shared services
  bootstrap: [AppComponent]
})
export class AppModule {
}
