import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterNamePipe } from './filter-name.pipe';

@NgModule({
  declarations: [
    FilterNamePipe
  ],
  exports: [
    FilterNamePipe
  ],
  providers: []
})
export class MySharedModule { }
