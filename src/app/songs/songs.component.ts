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

  constructor(private songService: SongService) {
  }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(): void {
    this.songService.getSongs().then((songs: Song[]) => this.songs = songs);
  }

  editSong(): void {
    console.log("edit song");
  }

  deleteSong(song: Song): void {
    this.songService.deleteSong(song);
  }

}
