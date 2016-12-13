import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
        <h2>{{ 'welcome' | translate }}</h2>
        <span>{{ artist | translate }}</span>
    `
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    console.log('Home Component always initialize.');
  }
}