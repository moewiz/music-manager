import { Component, OnInit } from '@angular/core';
import { SongService } from "../songs/song.service";
import { Song } from "../songs/song";
import { Router, ActivatedRoute, Params } from "@angular/router";
import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-add-new-song',
  templateUrl: './add-new-song.component.html',
  styles: [`
    .ng-valid[required], .ng-valid.required  {
      border-left: 5px solid #42A948; /* green */
    }
    
    .ng-invalid:not(form)  {
      border-left: 5px solid #a94442; /* red */
    }
  `],
  providers: [SongService]
})
export class AddNewSongComponent implements OnInit {
  title: string = "addSong";
  flagEdit: boolean = false;
  id: number;
  cachedData: Object = {
    name: '',
    artist: ''
  };
  songForm: FormGroup = new FormGroup({
    name: new FormControl(),
    artist: new FormControl()
  });

  constructor(private songService: SongService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    let nameParam = this.route.snapshot.params['id'];

    if (nameParam) {
      this.initEditForm();
    } else {
      this.initAddForm();
    }

  }

  initAddForm() {
    this.flagEdit = false;
    this.songForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(24)])],
      artist: ['', Validators.maxLength(32)]
    });
  }

  initEditForm() {
    this.title = "editSong";
    this.flagEdit = true;

    this.route.params
      .switchMap((params: Params) => {
        this.id = params['id'];
        return this.songService.getSongById(params['id']);
      })
      .subscribe((song: Song) => {
        this.cachedData = {
          name: song.name,
          artist: song.artist
        };
        this.songForm = this.fb.group({
          name: [song.name, Validators.compose([Validators.required, Validators.maxLength(24)])],
          artist: [song.artist, Validators.maxLength(32)]
        });
      });
  }

  submitForm(value: any) {
    if (this.flagEdit) {
      this.songService.updateSong(this.id, new Song(value)).subscribe(
        song => console.log('Song updated: ', song),
        err => console.error(err),
        () => this.router.navigate(['/songs'])
      );
    } else {
      this.songService.addSong(new Song(value)).subscribe(
        song => console.log("Song added:", song),
        err => console.error(err),
        () => this.router.navigate(['/songs'])
      );
    }
  }

  onReset() {
    (<FormGroup>this.songForm)
      .setValue(this.cachedData, { onlySelf: true });
  }

  disableSubmitBtn(): boolean {
    return _.isEqual(new Song(this.songForm.value), this.cachedData);
  }

}
