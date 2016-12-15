import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Song } from './song';
import { SONGS } from './mock-songs';
import * as _ from 'lodash';

import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SongService {
  private getAllSongsUrl = 'http://localhost:3000/api/songs';
  private addSongUrl = 'http://localhost:3000/api/songs';
  private deleteSongUrl = 'http://localhost:3000/api/songs';

  constructor(private http: Http) { }

  getSongs(): Observable<Song[]> {
    return this.http
      .get(this.getAllSongsUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSongById(id: number): Observable<Song> {
    return this.http
      .get(this.getAllSongsUrl + '/' + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSongsForPlaylist(listSongName: string[]): Promise<Song[]> {
    return Promise.resolve(SONGS).then((songs: Song[]) => {
      let songsForPlaylist: Song[] = [];
      _.forEach(listSongName, (songName) => {
        let song = _.find(songs, { name: songName });
        if (_.isObject(song)) {
          songsForPlaylist.push(song);
        }
      });
      return songsForPlaylist;
    });
  }

  addSong(song: Song) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let requestBody = JSON.stringify(song);

    return this.http
      .post(this.addSongUrl, requestBody, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateSong(song: Song) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let requestBody = JSON.stringify(song);
    let id = song._id;

    return this.http
      .put(this.addSongUrl + '/' + id, requestBody, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteSong(id: number) {
    let url = this.deleteSongUrl + '/' + id;
    return this.http
      .delete(url)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteSongs(ids: number[]) {
    console.log(ids);
    // return Promise.resolve(SONGS).then((songs: Song[]) =>
    //   _.forEach(_songs, (_song: Song) =>
    //     _.remove(songs, (song: Song) => _.isEqual(song, _song))
    //   )
    // );
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
