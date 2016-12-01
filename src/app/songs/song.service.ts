import {Injectable} from '@angular/core';
import {Song} from './song';
import {SONGS} from './mock-songs';
import * as _ from 'lodash';

@Injectable()
export class SongService {

  getSongByName(name: string): Promise<Song> {
    return Promise.resolve(SONGS).then((songs: Song[]) => _.find(songs, {name: name}));
  }

  getSongs(): Promise<Song[]> {
    return Promise.resolve(SONGS);
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
