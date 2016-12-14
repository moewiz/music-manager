export class Song {
  private id: number;
  public name: string = '';
  public artist: string = '';
  public checked: boolean = false;
  constructor (values: Object = {}) {
    Object.assign(this, values);
  }
}
