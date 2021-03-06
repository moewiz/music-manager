import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { Song } from './song';
import { SONGS } from './mock-songs';
import * as _ from 'lodash';

import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SongService {
  private baseUrl = 'http://localhost:3000/api/songs';

  constructor(private http: Http, private authenticationService: AuthenticationService) { }

  getSongs(): Observable<Song[]> {
    let headers = new Headers({ 'Authorization': this.authenticationService.token });
    let options = new RequestOptions({ headers: headers });

    return this.http
      .get(this.baseUrl, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSongById(id: number): Observable<Song> {
    return this.http
      .get(this.baseUrl + '/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  addSong(song: Song) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let requestBody = JSON.stringify(song);

    return this.http
      .post(this.baseUrl, requestBody, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateSong(id: number, song: Song) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let requestBody = JSON.stringify(song);

    return this.http
      .put(this.baseUrl + '/' + id, requestBody, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteSong(id: number) {
    let url = this.baseUrl + '/' + id;
    return this.http
      .delete(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteSongs(ids: number[]) {
    let options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json' })
    });
    let requestBody = JSON.stringify(ids);

    return this.http
      .put(this.baseUrl, requestBody, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body;
    if (res.json()) {
      body = res.json();
    }
    return body || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
