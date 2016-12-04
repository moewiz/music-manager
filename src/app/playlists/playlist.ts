export class Playlist {
  name: string;
  songs: string[];

  constructor (values: Object = {}) {
    Object.assign(this, values);
  }
}
