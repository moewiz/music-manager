import { Component, OnInit } from '@angular/core';
import {SongService} from "../songs/song.service";
import {Song} from "../songs/song";
import {Router, ActivatedRoute, Params} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import * as _ from 'lodash';

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
  model: Song = new Song();
  cachedModel: Song = new Song();
  flagEdit: boolean = false;

  constructor(
    private songService: SongService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let nameParam = this.route.snapshot.params['name'];

    if (nameParam) {
      this.title = "Edit song";
      this.flagEdit = true;
      this.route.params
        .switchMap((params: Params) => this.songService.getSongByName(params['name']))
        .subscribe((song: Song) => {
          this.model = _.cloneDeep(song);
          this.cachedModel = _.cloneDeep(song);
        });
    } else {
      this.flagEdit = false;
      this.model = new Song();
    }

  }

  onAddSong() {
    this.songService.addSong(this.model);
    this.router.navigate(['/songs']);
  }

  onUpdateSong() {
    this.songService.updateSong(this.model);
    this.router.navigate(['/songs']);
  }

  onCancel() {
    this.router.navigate(['/songs'])
  }

  disableUpdateBtn(): boolean {
    return _.isEqual(this.model, this.cachedModel);
  }

}
