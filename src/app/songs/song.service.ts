import {Injectable} from '@angular/core';
import {Song} from './song';
import {SONGS} from './mock-songs';
import * as _ from 'lodash';

@Injectable()
export class SongService {

  getSongs(): Promise<Song[]> {
    return Promise.resolve(SONGS);
  }

  addSong(song: Song) {
    Promise.resolve(SONGS).then((songs: Song[]) => songs.push(song));
  }

  deleteSong(_song: Song) {
    Promise.resolve(SONGS).then((songs: Song[]) => _.remove(songs, song => _.isEqual(song, _song)));
  }

}
