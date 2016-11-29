import {Component, OnInit} from '@angular/core';
import {SongService} from './song.service';
import {Song} from './song';

@Component({
  selector: 'songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
  providers: [SongService]
})
export class SongsComponent implements OnInit {
  title: string = "Songs";
  songs: Song[];
  public flagEditSong = false;

  constructor(private songService: SongService) {}

  ngOnInit():void {
    this.songs = this.songService.getSongs();
  }

  // bind song to form edit
  editSong(song) {
    this.flagEditSong = true;
    this.model = _.cloneDeep(song);
  }

  updateSong(song) {
    this.songService.updateSong(song.id, song);
    this.newSong();
  }

  deleteSong(_song) {
    this.songs = this.songService.deleteSong(_song);
  }

  /***** FORM *****/
  model:Song = new Song();

  onSubmit() {
    this.songService.addSong(this.model);
    this.newSong();
  }

  newSong() {
    this.model = new Song();
    this.flagEditSong = false;
  }

}
