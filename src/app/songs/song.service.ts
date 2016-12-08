import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { Song } from './song';
import { SONGS } from './mock-songs';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';

@Injectable()
export class SongService {

  constructor(private jsonp: Jsonp) { }

  search(term: string) {
    var search = new URLSearchParams();
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');
    return this.jsonp
      .get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', { search })
      .map(response => response.json()[1]);
  }

  getSongByName(name: string): Promise<Song> {
    return Promise.resolve(SONGS).then((songs: Song[]) => _.find(songs, { name: name }));
  }

  getSongs(): Promise<Song[]> {
    return Promise.resolve(SONGS);
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
    Promise.resolve(SONGS).then((songs: Song[]) => songs.push(song));
  }

  updateSong(song: Song) {
    this.getSongs().then((songs: Song[]) => {
      _.forEach(songs, (value, index, list) => {
        if (_.isEqual(value.name, song.name)) {
          list[index] = song;
        }
      });
    });
  }

  deleteSong(_song: Song) {
    Promise.resolve(SONGS).then((songs: Song[]) => _.remove(songs, song => _.isEqual(song, _song)));
  }

}
