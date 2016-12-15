export class Song {
  public _id: number;
  public name: string = '';
  public artist: string = '';
  constructor (values: Object = {}) {
    Object.assign(this, values);
  }
}
