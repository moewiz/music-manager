import { Component, OnInit } from '@angular/core';
import { SongService } from './song.service';
import { Song } from './song';
import { Router } from "@angular/router";
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
    selector: 'songs',
    templateUrl: './songs.component.html',
    styleUrls: ['./songs.component.css'],
    providers: [SongService]
})
export class SongsComponent implements OnInit {
    title: string = 'manageSongs';
    term = new FormControl();
    songs: Song[];
    isCheckAllSongs: boolean = false;
    isEnableDeleteMultiSongsBtn: boolean;
    searchTerm: string;
    searchKey: string = 'name';
    songsToDelete: Song[] = [];

    constructor(private songService: SongService, private router: Router) {
    }

    ngOnInit(): void {
        this.getSongs();
        this.term.valueChanges
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe(term => this.searchTerm = term.trim());
    }

    getSongs(): void {
        this.songService.getSongs().subscribe(
            (songs: Song[]) => this.songs = songs,
            error => console.log(error),
            () => {
                this.detectCheckAllSongs();
                this.checkEnableDeleteMultiSongsBtn();
            }
        );
    }

    detectCheckAllSongs() {
        if (this.songs.filter(song => song.checked).length === this.songs.length && this.songs.length !== 0) {
            this.isCheckAllSongs = true;
        } else {
            this.isCheckAllSongs = false;
        }

    }

    editSong(song): void {
        this.router.navigate(['/songs/edit', song.name]);
    }

    deleteSong() {
        this.songService.deleteSongs(this.songsToDelete)
            .then((songs: Song[]) => {
                console.log(songs);
                this.getSongs();
            })
            .catch((err) => { console.log(err) });
    }

    deleteMultiSongs() {
        this.songsToDelete = _.cloneDeep(this.songs.filter(song => song.checked));
        this.songService.deleteSongs(this.songsToDelete)
            .then((songs: Song[]) => {
                console.log(songs);
                this.getSongs();
            })
            .catch(err => console.log(err));
    }

    toggleSong(song: Song) {
        song.checked = !song.checked;
        if (this.isCheckAllSongs) {
            this.isCheckAllSongs = false;
        } else if (this.songs.filter(song => song.checked).length === this.songs.length && this.songs.length !== 0) {
            this.isCheckAllSongs = true;
        } else {
            this.isCheckAllSongs = false;
        }
        this.checkEnableDeleteMultiSongsBtn();
    }

    toggleAllSongs() {
        if (this.isCheckAllSongs) {
            this.checkAllSongs(false);
        } else {
            this.checkAllSongs(true);
        }
    }


    checkAllSongs(_check: boolean) {
        _.forEach(this.songs, song => {
            song.checked = _check;
        });
        this.isCheckAllSongs = _check;
        this.isEnableDeleteMultiSongsBtn = _check;
    }

    checkEnableDeleteMultiSongsBtn() {
        for (let i = this.songs.length - 1; i >= 0; i--) {
            if (this.songs[i].checked) {
                this.isEnableDeleteMultiSongsBtn = true;
                return;
            }
        }
        this.isEnableDeleteMultiSongsBtn = false;
    }

    addSongToDelete(song: Song) {
        this.songsToDelete.length = 0;
        this.songsToDelete.push(song);
    }

    searchByName() {
        this.searchKey = 'name';
    }

    searchByArtist() {
        this.searchKey = 'artist';
    } 
}
