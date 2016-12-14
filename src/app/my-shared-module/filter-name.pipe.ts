import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filterName',
  pure: false
})
export class FilterNamePipe implements PipeTransform {

  transform(list: any, searchKey: string, key: string = 'name'): any {
    if (_.isNull(list) || _.isUndefined(list)) {
      return null;
    }
    var reg = new RegExp(searchKey, 'i');
    return list.filter(item => item[key].match(reg));
  }

}
