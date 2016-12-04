import { Injectable } from '@angular/core';
import { Song } from './song';
import { SONGS } from './mock-songs';
import * as _ from 'lodash';

@Injectable()
export class SongService {

  getSongByName(name: string): Promise<Song> {
    return Promise.resolve(SONGS).then((songs: Song[]) => _.find(songs, {name: name}));
  }

  getSongs(): Promise<Song[]> {
    return Promise.resolve(SONGS);
  }

  getSongsForPlaylist(listSongName: string[]): Promise<Song[]> {
    // let songs: Song[] = [];
    // _.forEach(listSongName, (songName) => {
    //   _this.getSongByName(songName).then((song: Song) => {
    //     if (_.isObject(song)) {
    //       songs.push(song);
    //     }
    //   });
    // });
    // return songs;
    return Promise.resolve(SONGS).then((songs: Song[]) => {
      let songsForPlaylist: Song[] = [];
      _.forEach(listSongName, (songName) => {
        let song = _.find(songs, {name: songName});
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
