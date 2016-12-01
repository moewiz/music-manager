import {ucs2} from "punycode";
export class Song {
  public name: string = '';
  public artist: string = '';

  constructor (values: Object = {}) {
    Object.assign(this, values);
  }
}
