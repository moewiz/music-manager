import { Injectable } from "@angular/core";
import * as _ from 'lodash';
import { Playlist } from "./playlist";
import { PLAYLISTS } from "./mock-playlists";

@Injectable()
export class PlaylistService {

  getPlaylists(): Promise<Playlist[]> {
    return Promise.resolve(PLAYLISTS);
  }

}
