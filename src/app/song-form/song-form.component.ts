import { Component } from '@angular/core';
import { Song } from '../songs/song';

@Component({
  selector: 'song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css']
})
export class SongFormComponent {

  model = new Song();

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  clear() {
    this.model = new Song();
  }
}
