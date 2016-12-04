import { Component, OnInit } from '@angular/core';
import { Playlist } from "./playlist";
import { PlaylistService } from "./playlist.service";
import * as _ from 'lodash';
import { Song } from "../songs/song";
import { SongService } from "../songs/song.service";

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
  providers: [PlaylistService, SongService]
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  songs: Song[] = [];
  playlistSelected: Playlist = new Playlist();

  constructor(private playlistService: PlaylistService, private songService: SongService) {
  }

  ngOnInit() {
    this.getPlaylists();
  }

  havePlaylistSelected(): boolean {
    return _.get(this.playlistSelected, 'name', false);
  }

  onSelect(playlist: Playlist) {
    this.playlistSelected = playlist;
    this.songService.getSongsForPlaylist(this.playlistSelected.songs).then((songs: Song[]) => this.songs = songs);
  }

  getPlaylists(): void {
    this.playlistService.getPlaylists().then((playlists: Playlist[]) => {
      this.playlists = playlists;
    });
  }
}
