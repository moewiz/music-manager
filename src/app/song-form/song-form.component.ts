import {Component, Input} from '@angular/core';
import {SongService} from "../songs/song.service";
import {Song} from "../songs/song";

@Component({
  selector: 'song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css'],
})
export class SongFormComponent {
  @Input() song: Song;
  @Input() flagEdit: boolean;
  @Input() addSong;
  @Input() updateSong;
  @Input() newSong;
}
