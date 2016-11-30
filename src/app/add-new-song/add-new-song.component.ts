import { Component, OnInit } from '@angular/core';
import {SongService} from "../songs/song.service";
import {Song} from "../songs/song";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-new-song',
  templateUrl: './add-new-song.component.html',
  styleUrls: ['./add-new-song.component.css'],
  providers: [SongService]
})
export class AddNewSongComponent implements OnInit {
  title: string = "New Song";

  constructor(private songService: SongService, private router: Router) { }

  ngOnInit() {
  }

  onAddSong({name, artist}) {
    let song: Song = new Song({name, artist});
    this.songService.addSong(song);
    this.router.navigate(['/songs']);
  }

  onCancel() {
    this.router.navigate(['/songs'])
  }

}
