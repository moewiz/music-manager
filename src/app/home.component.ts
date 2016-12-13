import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
        <h2>Welcome to Summoner's Rift</h2>
    `
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    console.log('Thirty seconds until minions spawn!');
  }
}