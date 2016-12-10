import { Component, OnInit } from '@angular/core';
import { SongService } from './song.service';
import { Song } from './song';
import { Router } from "@angular/router";
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'songs',
    templateUrl: './songs.component.html',
    styleUrls: ['./songs.component.css'],
    providers: [SongService]
})
export class SongsComponent implements OnInit {
    title: string = "Songs";
    items: Song[];
    term = new FormControl();
    songs: Song[];

    constructor(private songService: SongService, private router: Router) {
    }

    ngOnInit(): void {
        this.getSongs();

        this.term.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(term => this.songService.searchSongName(term))
            .subscribe((songs: Song[]) => this.items = songs);
    }

    getSongs(): void {
        this.songService.getSongs().subscribe(
            (songs: Song[]) => this.songs = songs,
            error => console.error(error),
            () => console.log('finished getSongsV2()')
        );
    }

    editSong(song): void {
        this.router.navigate(['/songs/edit', song.name]);
    }

    deleteSong(song: Song): void {
        if (confirm("Are you sure you want to delete this song?")) {
            this.songService.deleteSong(song);
        }
    }

}
