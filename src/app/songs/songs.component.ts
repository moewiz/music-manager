import {Component, OnInit} from '@angular/core';
import {SongService} from './song.service';
import {Song} from './song';
import {Router} from "@angular/router";

@Component({
  selector: 'songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css'],
  providers: [SongService]
})
export class SongsComponent implements OnInit {
  title: string = "Songs";
  songs: Song[];

  constructor(private songService: SongService, private router: Router) {
  }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(): void {
    this.songService.getSongs().then((songs: Song[]) => this.songs = songs);
  }

  editSong(song): void {
    this.router.navigate(['/songs/edit', song.name]);
  }

  deleteSong(song: Song): void {
    this.songService.deleteSong(song);
  }

}
