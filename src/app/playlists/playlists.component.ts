import { Component, OnInit } from '@angular/core';
import { Playlist } from "./playlist";
import { PlaylistService } from "./playlist.service";
import * as _ from 'lodash';
import { Song } from "../songs/song";
import { SongService } from "../songs/song.service";
import { Router } from "@angular/router";
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

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
  term: FormControl = new FormControl();
  searchKey: string;

  constructor(private playlistService: PlaylistService,
    private songService: SongService,
    private router: Router) {
  }

  ngOnInit() {
    this.getPlaylists();
    this.term.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(term => this.searchKey = term.trim());
  }

  onSelectOne(playlist: Playlist) {
    this.playlistSelected.length = 0;
    this.playlistSelected.push(playlist);

    if (this.isShowListSongs()) {
      this.playlistService.getSongsForPlaylist(this.playlistSelected[0]._id, this.playlistSelected[0].songs).subscribe(
        songs => this.songs = songs,
        err => console.error(err),
      );
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
    this.router.navigate(['/playlists/edit', playlist.name]);
    event.stopPropagation();
  }

  getPlaylists(): void {
    this.playlistService.getPlaylists().subscribe(
      playlists => this.playlists = playlists,
      err => console.error(err)
    );
  }

  isHighlightPlaylist(playlist: Playlist) {
    return _.find(this.playlistSelected, playlist);
  }

  isShowListSongs() {
    return this.playlistSelected.length === 1
  }
}
