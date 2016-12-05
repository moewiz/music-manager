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
  playlistSelected: Playlist[] = [];

  constructor(private playlistService: PlaylistService, private songService: SongService) {
  }

  ngOnInit() {
    this.getPlaylists();
  }

  onSelectOne(playlist: Playlist) {
    this.playlistSelected.length = 0;
    this.playlistSelected.push(playlist);

    if (this.isShowListSongs()) {
      this.songService.getSongsForPlaylist(this.playlistSelected[0].songs).then((songs: Song[]) => this.songs = songs);
    } else {
      this.songs.length = 0;
    }
  }

  onDelete(playlist, event) {
    this.onSelectOne(playlist);

    if (confirm("Are you sure you want to delete this playlist?")) {
      this.playlistService.deletePlaylists(playlist);
      this.playlistSelected.length = 0;
    }

    event.stopPropagation();
  }

  onEdit(playlist: Playlist, event) {
    event.stopPropagation();
  }

  getPlaylists(): void {
    this.playlistService.getPlaylists().then((playlists: Playlist[]) => {
      this.playlists = playlists;
    });
  }

  isHighlightPlaylist(playlist: Playlist) {
    return _.find(this.playlistSelected, playlist);
  }

  isShowListSongs() {
    return this.playlistSelected.length === 1
  }
}
