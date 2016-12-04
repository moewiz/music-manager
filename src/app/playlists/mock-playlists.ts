import { Playlist } from "./playlist";

export const PLAYLISTS: Playlist[] = [
  new Playlist(
    {
      name: 'Playlist 1',
      songs: ['Hello', 'Heathens']
    }),
  new Playlist(
    {
      name: 'Playlist 2',
      songs: ['ABC song', 'Hello', 'Heathens', 'Bad things']
    }),
  new Playlist(
    {
      name: 'Playlist 3',
      songs: ['Hello', 'Heathens', 'Bad things']
    }),
];
