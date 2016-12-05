import { Injectable } from "@angular/core";
import { Playlist } from "./playlist";
import { PLAYLISTS } from "./mock-playlists";
import * as _ from 'lodash';

@Injectable()
export class PlaylistService {

  getPlaylists(): Promise<Playlist[]> {
    return Promise.resolve(PLAYLISTS);
  }

  deletePlaylists(_playlist: Playlist) {
    this.getPlaylists().then((playlists: Playlist[]) => {
      _.remove(playlists, playlist => _.isEqual(playlist, _playlist));
    });
  }

}
