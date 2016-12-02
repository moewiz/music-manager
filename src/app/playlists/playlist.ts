import { Song } from "../songs/song";
export class Playlist {
  name: string;
  songs: Song[];

  constructor (values: Object = {}) {
    Object.assign(this, values);
  }
}
