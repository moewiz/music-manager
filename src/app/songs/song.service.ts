import { Injectable } from '@angular/core';
import { URLSearchParams, Jsonp } from '@angular/http';
import { Song } from './song';
import { SONGS } from './mock-songs';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SongService {

  searchSongName(term: string): Observable<Song[]> {
    if (_.isEmpty(term.trim())) {
      return Observable.create(observer => {
        observer.next([]);
        observer.complete();
      });
    }

    this.getSongs().subscribe(
      (songs: Song[]) => {
        let reg = new RegExp(term, 'i');
        let data = songs.filter(song => song.name.match(reg) && song.name.match(reg).length);
        return Observable.create(obs => {
          obs.next(data);
          obs.complete();
        })
      },
      error => console.error(error));
  }

  getSongs(): Observable<Song[]> {
    return new Observable(observer => {
      observer.next(SONGS);
      observer.error("Error when get songs");
      observer.complete();
    });
  }

  getSongByName(name: string): Promise<Song> {
    return Promise.resolve(SONGS).then((songs: Song[]) => _.find(songs, { name: name }));
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
    this.getSongs().subscribe((songs: Song[]) => {
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
