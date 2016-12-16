export class Playlist {
  _id: string;
  name: string = '';
  songs: string[] = [];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
