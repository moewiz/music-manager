import { Injectable } from "@angular/core";
import { Playlist } from "./playlist";
import { PLAYLISTS } from "./mock-playlists";
import * as _ from 'lodash';

@Injectable()
export class PlaylistService {

  getPlaylistByName(playlistName: string): Promise<Playlist> {
    return this.getPlaylists()
      .then((playlists: Playlist[]) =>_.find(playlists, {name: playlistName}));
  }

  getPlaylists(): Promise<Playlist[]> {
    return Promise.resolve(PLAYLISTS);
  }

  addPlaylist(playlist: Playlist) {
    this.getPlaylists().then((playlists: Playlist[]) => playlists.push(playlist));
  }

  updatePlaylist(playlist: Playlist) {
    this.getPlaylists()
      .then((playlists: Playlist[]) => {
        _.forEach(playlists, (value, index, list) => {
          if (_.isEqual(value.name, playlist.name)) {
            list[index] = playlist;
          }
        });
      });
  }

  deletePlaylists(_playlist: Playlist) {
    this.getPlaylists().then((playlists: Playlist[]) => {
      _.remove(playlists, playlist => _.isEqual(playlist, _playlist));
    });
  }

}
