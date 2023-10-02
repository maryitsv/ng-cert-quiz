import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FilterItem } from '../data.models';
import { FilterItemByNamePipe } from '../pipes/filter-item-by-name.pipe';

@Component({
  selector: 'app-auto-filter',
  templateUrl: './auto-filter.component.html',
  styleUrls: ['./auto-filter.component.css']
})
export class AutoFilterComponent<T extends FilterItem = FilterItem>{
  @Input() list:T[] = [];
  @Input() labelText: string = '';
  @Input() value: string = '';
  @Output() itemSelected = new EventEmitter<T>();
  @Output() valueChange = new EventEmitter<string>();
  
  search: string = '';
  showList: boolean = false;
  showZeroState: boolean = false;

  constructor(private filterItemsByName:FilterItemByNamePipe){
  }

  searchChange(): void {
    this.showZeroState = this.filterItemsByName.transform(this.list, this.search).length === 0;
  }

  onSelectOption(event:MouseEvent, item: any) {
    event.stopPropagation();
    console.log('on auto filter select option', item);
    this.search = item.name;
    this.itemSelected.emit(item);
    this.valueChange.emit(item.id);
    this.searchFocusOut();
  }

  searchFocusIn(){
    console.log('on auto filter show list');
    this.showList = true;
  }

  searchFocusOut(){
    console.log('on auto filter hide list');
    this.showList = false;
  }

  clear(){
    this.search = '';
    this.itemSelected.emit(undefined);
    this.searchFocusOut();
    this.valueChange.emit(undefined);
  }
}
