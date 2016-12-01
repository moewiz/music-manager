import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container-fluid">
      <div class="jumbotron">
        <h1>
          {{title}}
        </h1>
      </div>
      <nav class="navbar navbar-inverse">
        <ul class="nav navbar-nav">
          <li><a [routerLink]="['/songs']" routerLinkActive="active">Songs</a></li>
          <li><a [routerLink]="['/playlists']" routerLinkActive="active">Playlists</a></li>
        </ul>
      </nav>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`  
    .navbar-nav li a {
      color: #9d9d9d !important;
    }
    .navbar-nav li a.active {
      color: #fff !important;
    }
  `]
})
export class AppComponent {
  title = 'Music Manager';
}
