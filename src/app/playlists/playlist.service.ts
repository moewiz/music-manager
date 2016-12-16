import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Playlist } from "./playlist";
import { PLAYLISTS } from "./mock-playlists";
import * as _ from 'lodash';

import 'rxjs/add/observable/throw';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlaylistService {
  private baseUrl = 'http://localhost:3000/api/playlists';

  constructor(private http: Http) { }

  getPlaylists() {
    return this.http
      .get(this.baseUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getSongsForPlaylist(id: string, listSongId: string[]) {
    return this.http
      .get(this.baseUrl + '/' + id + '/songs')
      .map(this.extractData)
      .catch(this.handleError);
  }

  getPlaylistByName(playlistName: string): Promise<Playlist> {
    return this.getPlaylists()
      .then((playlists: Playlist[]) => _.find(playlists, { name: playlistName }));
  }

  addPlaylist(playlist: Playlist) {
    this.getPlaylists().then((playlists: Playlist[]) => playlists.push(playlist));
  }

  updatePlaylist(playlist: Playlist) {
    this.getPlaylists()
      .then((playlists: Playlist[]) => {
        _.forEach(playlists, (value, index, list) => {
          if (_.isEqual(value.name, playlist.name)) {
            list[index] = playlist;
          }
        });
      });
  }

  deletePlaylists(_playlist: Playlist) {
    this.getPlaylists().then((playlists: Playlist[]) => {
      _.remove(playlists, playlist => _.isEqual(playlist, _playlist));
    });
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
