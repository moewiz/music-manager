import { Playlist } from "./playlist";
import { Song } from '../songs/song';

export const PLAYLISTS: Playlist[] = [
  new Playlist(
    {
      name: 'Playlist 1',
      songs: [
        new Song({name: "Hello", artist: "Adele"}),
        new Song({name: "Heathens", artist: "twenty one pilots"})
      ]
    }),
  new Playlist(
    {
      name: 'Playlist 2',
      songs: [
        new Song({name: "ABC song", artist: "Thailand"}),
        new Song({name: "Hello", artist: "Adele"}),
        new Song({name: "Heathens", artist: "twenty one pilots"}),
        new Song({name: "Bad things", artist: "Machine Gun Kelly ft. Camila Cabello"})
      ]
    }),
  new Playlist(
    {
      name: 'Playlist 3',
      songs: [
        new Song({name: "Hello", artist: "Adele"}),
        new Song({name: "Bad things", artist: "Machine Gun Kelly ft. Camila Cabello"}),
        new Song({name: "Heathens", artist: "twenty one pilots"})
      ]
    }),
];
