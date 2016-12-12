import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterName',
  pure: false
})
export class FilterNamePipe implements PipeTransform {

  transform(list: any, searchKey: string, key: string = 'name'): any {
    var reg = new RegExp(searchKey, 'i');
    return list.filter(item => item[key].match(reg));
  }

}
