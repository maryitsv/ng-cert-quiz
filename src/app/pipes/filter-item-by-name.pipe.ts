import { Pipe, PipeTransform } from '@angular/core';
import { FilterItem } from '../data.models';

@Pipe({
  name: 'filterItemByName'
})
export class FilterItemByNamePipe implements PipeTransform {

  transform(list: FilterItem[]=[], search: string=''): FilterItem[] {

    console.log('in the pipe list',list);
    console.log('in the pipe search',search);
    
    if (!search) {
      return list;
    }
    const dataToSearch: string = search.toLowerCase();

    // filter the items that has a match with the search
    return list.filter((item: FilterItem) => item.name.toLowerCase().indexOf(dataToSearch) !== -1);
  }

}
