import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterName',
  pure: false
})
export class FilterNamePipe implements PipeTransform {

  transform(list: any, searchKey?: string): any {
    var reg = new RegExp(searchKey, 'i');
    return list.filter(item => item.name.match(reg));
  }

}
