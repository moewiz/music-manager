import { Component, OnInit } from "@angular/core";
import { PlaylistService } from "./playlist.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Playlist } from "./playlist";
import * as _ from 'lodash';
import { Song } from "../songs/song";
import { SongService } from "../songs/song.service";

@Component({
  selector: 'playlist-form',
  templateUrl: './playlist-form.component.html',
  styles: [`
    h3 {
      text-transform: capitalize;
    }
    .ng-valid[required], .ng-valid.required  {
      border-left: 5px solid #42A948; /* green */
    }
    
    .ng-invalid:not(form)  {
      border-left: 5px solid #a94442; /* red */
    }
    
    .list-group .list-group-item p:first-child {
      font-weight: 600;
    }
    
    .list-group .list-group-item p:last-child {
      font-style: italic;
      font-size: 13px;
    }
  `],
  providers: [PlaylistService, SongService]
})

export class PlaylistFormComponent implements OnInit {
  title: string = "Add playlist";
  flagEdit: boolean = false;
  songs: Song[] = [];
  songsForPlaylist: Song[] = [];
  model: Playlist = new Playlist();
  cachedData: Playlist = new Playlist();

  constructor(private playlistService: PlaylistService,
              private songService: SongService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let playlistNameParam = this.route.snapshot.params['name'];

    if (playlistNameParam) {
      this.title = "Edit playlist";
      this.flagEdit = true;

      this.playlistService.getPlaylistByName(playlistNameParam)
        .then((playlist: Playlist) => {
          this.model = _.cloneDeep(playlist);
          this.songService.getSongsForPlaylist(this.model.songs)
            .then((songs: Song[]) => this.songsForPlaylist = songs);
          this.cachedData = _.cloneDeep(playlist);
        });
    } else {
      this.flagEdit = false;
    }

    this.songService.getSongs().then((songs: Song[]) => {
      this.songs = songs
    });
  }

  onSubmit() {
    if (this.flagEdit) {
      this.playlistService.updatePlaylist(this.model);
    } else {
      this.playlistService.addPlaylist(this.model);
    }
    this.router.navigate(['/playlists']);
  }

  onReset() {
    this.model = _.cloneDeep(this.cachedData);
  }

  disableSubmitBtn(): boolean {
    return _.isEqual(JSON.stringify(this.model), JSON.stringify(this.cachedData));
  }

  onSelectSong(song: Song) {
    this.model.songs.push(song.name);
    this.songsForPlaylist.push(song);
  }

  onRemoveSong(_song: Song) {
    _.remove(this.model.songs, song => _.isEqual(song, _song.name));
    _.remove(this.songsForPlaylist, song => _.isEqual(song, _song));
  }

  isSelected(song: Song): boolean {
    for(var i = 0; i < this.songsForPlaylist.length; i++) {
      if (_.isEqual(this.songsForPlaylist[i], song)) {
        return true;
      }
    }
    return false;
  }

}
