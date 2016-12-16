export class Song {
  public _id: string;
  public name: string = '';
  public artist: string = '';
  constructor (values: Object = {}) {
    Object.assign(this, values);
  }
}
