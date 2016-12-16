import { Component, OnInit } from '@angular/core';
import { SongService } from './song.service';
import { Song } from './song';
import { Router } from "@angular/router";
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
  providers: [SongService]
})
export class SongsComponent implements OnInit {
  title: string = 'manageSongs';
  term = new FormControl();
  songs: Song[];
  isCheckAllSongs: boolean = false;
  isEnableDeleteMultiSongsBtn: boolean;
  searchTerm: string;
  searchKey: string = 'name';
  songsToDelete: string[] = [];

  constructor(private songService: SongService, private router: Router) {
  }

  ngOnInit(): void {
    this.getSongs();
    this.term.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(term => this.searchTerm = term.trim());
  }

  getSongs(): void {
    this.songService.getSongs().subscribe(
      (songs: Song[]) => this.songs = songs,
      error => console.log(error),
      () => {
        this.detectCheckAllSongs();
        this.detectCheckEnableDeleteMultiSongsBtn();
      }
    );
  }

  detectCheckAllSongs() {
    this.isCheckAllSongs = this.songsToDelete.length === this.songs.length;
  }

  editSong(song): void {
    this.router.navigate(['/songs/edit', song._id]);
  }

  deleteSong() {
    this.songService.deleteSong(this.songsToDelete[0]).subscribe(
      msg => console.log('Song deleted:', msg),
      err => console.error(err),
      () => {
        this.getSongs();
        this.songsToDelete.length = 0;
      }
    );
  }

  deleteMultiSongs() {
    this.songService.deleteSongs(this.songsToDelete).subscribe(
      msg => console.log('deleted songs:', msg),
      err => console.error(err),
      () => {
        this.getSongs();
        this.songsToDelete.length = 0;
      }
    );
  }

  toggleSong(song: Song) {
    if (this.songsToDelete.length === 0) {
      this.songsToDelete.push(song._id);
    } else {
      let index = this.songsToDelete.indexOf(song._id);
      if (index !== -1) {
        this.songsToDelete.splice(index, 1);
      } else {
        this.songsToDelete.push(song._id);
      }
    }
    this.detectCheckAllSongs();
    this.detectCheckEnableDeleteMultiSongsBtn();
  }

  isCheckedSong(song): boolean {
    let index = this.songsToDelete.indexOf(song._id);
    return index !== -1;
  }

  toggleAllSongs() {
    if (this.isCheckAllSongs) {
      this.songsToDelete.length = 0;
    } else {
      this.checkAllSongs();
    }
    this.detectCheckAllSongs();
    this.detectCheckEnableDeleteMultiSongsBtn();
  }

  checkAllSongs() {
    this.songsToDelete.length = 0;
    for (let i = this.songs.length; i--;) {
      this.songsToDelete.push(this.songs[i]._id);
    }
  }

  detectCheckEnableDeleteMultiSongsBtn() {
    this.isEnableDeleteMultiSongsBtn = this.songsToDelete.length ? true : false;
  }

  addSongToDelete(song: Song) {
    this.songsToDelete.length = 0;
    this.songsToDelete.push(song._id);
    this.detectCheckAllSongs();
    this.detectCheckEnableDeleteMultiSongsBtn();
  }

  searchByName() {
    this.searchKey = 'name';
  }

  searchByArtist() {
    this.searchKey = 'artist';
  }
}
