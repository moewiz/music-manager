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
  title: string = "Songs";
  // data: Observable<Song>;
  // items: Array<Song> = [];
  term = new FormControl();
  songs: Song[];
  isCheckAllSongs: boolean = false;
  isEnableDeleteMultiSongsBtn: boolean;
  searchKey: string;

  constructor(private songService: SongService, private router: Router) {
  }

  ngOnInit(): void {
    this.getSongs();
    this.term.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(term => this.searchKey = term);
  }

  getSongs(): void {
    this.songService.getSongsV2().subscribe(
      (songs: Song[]) => this.songs = songs,
      error => console.log(error),
      () => {
        this.checkEnableDeleteMultiSongsBtn();
      }
    );
  }

  editSong(song): void {
    this.router.navigate(['/songs/edit', song.name]);
  }

  deleteSong(song: Song): void {
    if (confirm("Are you sure you want to delete this song?")) {
      this.songService.deleteSong(song);
    }
  }

  deleteMultiSongs() {
    if (confirm("Are you sure you want to delete chosen song(s)?")) {
      this.songService.deleteMultiSongs(this.songs.filter(song => song.checked));
    }
  }

  toggleSong(song: Song) {
    song.checked = !song.checked;
    if (this.isCheckAllSongs) {
      this.isCheckAllSongs = false;
    } else if (this.songs.filter(song => song.checked).length === this.songs.length) {
      this.isCheckAllSongs = true;
    } else {
      this.isCheckAllSongs = false;
    }
    this.checkEnableDeleteMultiSongsBtn();
  }

  toggleAllSongs() {
    if (this.isCheckAllSongs) {
      this.checkAllSongs(false);
    } else {
      this.checkAllSongs(true);
    }
  }


  checkAllSongs(_check: boolean) {
    _.forEach(this.songs, song => {
      song.checked = _check;
    });
    this.isCheckAllSongs = _check;
    this.isEnableDeleteMultiSongsBtn = _check;
  }

  checkEnableDeleteMultiSongsBtn() {
    for (let i = this.songs.length - 1; i >= 0; i--) {
      if (this.songs[i].checked) {
        this.isEnableDeleteMultiSongsBtn = true;
        return;
      }
    }
    this.isEnableDeleteMultiSongsBtn = false;
  }
}
