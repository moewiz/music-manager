import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { Song } from './song';
import { SONGS } from './mock-songs';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SongService {

  getSongsV2(): Observable<Song[]> {
    return new Observable(observer => {
      observer.next(SONGS);
      observer.complete();
    });
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

  deleteSongs(_songs: Song[]): Promise<Song[]> {
    return Promise.resolve(SONGS).then((songs: Song[]) =>
      _.forEach(_songs, (_song: Song) =>
        _.remove(songs, (song: Song) => _.isEqual(song, _song))
      )
    );
  }
}
