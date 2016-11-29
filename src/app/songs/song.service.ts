import {Injectable} from '@angular/core';
import {Song} from "./song";
import * as _ from 'lodash';

@Injectable()
export class SongService {
  private lastId: number = 0;
  private songs: Song[] = [];

  // Simulate POST /songs
  addSong(song: Song): SongService {
    if (!song.id) {
      song.id = ++this.lastId;
    }
    this.songs.push(song);
    return this;
  }

  // Simulate DELETE /songs/:id
  deleteSong(_song: Song): Song[] {
    this.songs = this.songs
      .filter(song => !_.isEqual(song, _song));
    return this.songs;
  }

  // Simulate UPDATE /songs
  updateSong(id: number, values: Object = {}): Song {
    let song = this.getSongById(id);
    if (!song) {
      return null;
    }
    Object.assign(song, values);
    return song;
  }

  // Simulate GET /songs
  getSongs(): Song[] {
    return this.songs;
  }

  getSongById(id:number): Song {
    return this.songs
      .filter(song => song.id === +id)
      .pop();
  }
}
