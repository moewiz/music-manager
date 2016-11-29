import {Component, OnInit} from '@angular/core';
import {SongService} from './song.service';
import {Song} from './song';
import * as _ from 'lodash';

@Component({
  selector: 'songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
  providers: [SongService]
})
export class SongsComponent implements OnInit {
  title: string = "Songs";
  songs: Song[];

  selectedSong: Song;
  flagEdit = false;

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(): void {
    this.songs = this.songService.getSongs();
  }

  // bind song to song form
  editSong(song) {
    this.flagEdit = true;
    this.selectedSong = _.cloneDeep(song);
  }


  deleteSong(_song) {
    this.songs = this.songService.deleteSong(_song);
  }

  /***** SONG FORM *****/
  addSong(song) {
    this.songService.addSong(song);
    this.newSong();
  }

  updateSong(song) {
    this.songService.updateSong(song.id, song);
    this.newSong();
  }

  newSong() {
    this.selectedSong = new Song();
    this.flagEdit = false;
  }

}
