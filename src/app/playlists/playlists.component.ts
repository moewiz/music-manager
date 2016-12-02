import { Component, OnInit } from '@angular/core';
import { Playlist } from "./playlist";
import { PlaylistService } from "./playlist.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
  providers: [PlaylistService]
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  playlistSelected: Playlist = new Playlist();

  constructor(private playlistService: PlaylistService) {
  }

  ngOnInit() {
    this.getPlaylists();
  }

  havePlaylistSelected(): boolean {
    return _.get(this.playlistSelected, 'name', false);
  }

  onSelect(playlist: Playlist) {
    this.playlistSelected = playlist;
  }

  getPlaylists(): void {
    this.playlistService.getPlaylists().then((playlists: Playlist[]) => this.playlists = playlists);
  }
}
