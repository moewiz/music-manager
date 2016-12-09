import { Component, OnInit } from '@angular/core';
import { SongService } from './song.service';
import { Song } from './song';
import { Router } from "@angular/router";
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
  providers: [SongService]
})
export class SongsComponent implements OnInit {
  title: string = "Songs";
  data: Observable<Song[]>;
  items: Array<Song> = [];
  term = new FormControl();
  songs: Song[];

  constructor(private songService: SongService, private router: Router) {
  }

  ngOnInit(): void {
    this.getSongs();

    this.data = new Observable(observer => {
      setTimeout(function () {
        observer.next(new Song({ name: "A" }));
      }, 1000);

      setTimeout(function () {
        observer.next(new Song({ name: "B" }));
      }, 2000);

      setTimeout(function () {
        observer.complete();
      }, 3000);
    });
    // this.data = this.term.valueChanges
    //   .debounceTime(400)
    //   .distinctUntilChanged()
    //   .switchMap(term => 'Observable<Song[]>');

    this.data.subscribe(
      (song: Song) => this.items.push(song),
      error => console.log(error),
      () => console.log('finished')
    );
    // this.term.valueChanges
    //   .debounceTime(400)
    //   .distinctUntilChanged()
    //   .switchMap(term => this.songService.searchSongName(term))
    //   .subscribe(songs => this.items = songs);
  }

  getSongs(): void {
    this.songService.getSongsV2().subscribe(
      (songs: Song[]) => this.songs = songs,
      error => console.log(error),
      () => console.log('finished getSongsV2()')
    );
    // this.songService.getSongs().then((songs: Song[]) => this.songs = songs);
  }

  editSong(song): void {
    this.router.navigate(['/songs/edit', song.name]);
  }

  deleteSong(song: Song): void {
    if (confirm("Are you sure you want to delete this song?")) {
      this.songService.deleteSong(song);
    }
  }

}
