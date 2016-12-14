import { Injectable } from '@angular/core';
import { Jsonp, Http, Response } from '@angular/http';
import { Song } from './song';
import { SONGS } from './mock-songs';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SongService {
  private getAllSongsUrl = './app/api/songs.json';
  constructor(private http: Http) { }

  getSongs(): Observable<Song[]> {
    return this.http.get(this.getAllSongsUrl)
      .map((res: Response) => res.json());
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

  deleteSongs(_songs: Song[]): Promise<Song[]> {
    return Promise.resolve(SONGS).then((songs: Song[]) =>
      _.forEach(_songs, (_song: Song) =>
        _.remove(songs, (song: Song) => _.isEqual(song, _song))
      )
    );
  }
}
