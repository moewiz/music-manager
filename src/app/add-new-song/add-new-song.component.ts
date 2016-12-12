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
  title: string = "Add Song";
  flagEdit: boolean = false;
  cachedData: Object = {};
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
    let nameParam = this.route.snapshot.params['name'];

    if (nameParam) {
      this.title = "Edit song";
      this.flagEdit = true;

      this.route.params
        .switchMap((params: Params) => this.songService.getSongByName(params['name']))
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
    } else {
      this.flagEdit = false;
      this.songForm = this.fb.group({
        name: ['', Validators.compose([Validators.required, Validators.maxLength(24)])],
        artist: ['', Validators.maxLength(32)]
      });
    }

  }

  submitForm(value: any) {
    if (this.flagEdit) {
      this.songService.updateSong(new Song(value));
    } else {
      this.songService.addSong(new Song(value));
    }
    this.router.navigate(['/songs']);
  }

  onReset() {
    (<FormGroup>this.songForm)
      .setValue(this.cachedData, {onlySelf: true});
    // this.songForm.controls['name'].reset(this.cachedData.name);
    // this.songForm.controls['artist'].reset(this.cachedData.artist);
    // be the same
    // this.songForm.controls['name'].setValue(this.cachedData.name);
    // this.songForm.controls['artist'].setValue(this.cachedData.artist);
  }

  disableSubmitBtn(): boolean {
    return _.isEqual(new Song(this.songForm.value), this.cachedData);
  }

}
