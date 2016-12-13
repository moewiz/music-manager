import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';

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
          <li><a [routerLink]="['/songs']" routerLinkActive="active">{{ 'songs' | translate }}</a></li>
          <li><a [routerLink]="['/playlists']" routerLinkActive="active">{{ 'playlists' | translate }}</a></li>
        </ul>
      </nav>
      <router-outlet></router-outlet>
      <div class="footer">
        <div class="btn-group text-right">
          <button *ngFor="let lang of supportedLangs" (click)="selectLang(lang.value)" class="btn btn-default" [class.btn-primary]="isCurrentLang(lang.value)">{{ lang.display }}</button>
        </div>
      </div>
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
export class AppComponent implements OnInit {
  title = 'Music Manager';
  supportedLangs: any[];

  constructor(private translateService: TranslateService) { }

  ngOnInit() {
    this.translateService.setDefaultLang('en');
    this.supportedLangs = [
      { display: 'EN', value: 'en' },
      { display: 'VI', value: 'vi' }
    ];
    this.selectLang('en');
  }

  isCurrentLang(lang: string) {
    return lang === this.translateService.currentLang;
  }

  selectLang(lang: string) {
    this.translateService.use(lang);
  }
}
