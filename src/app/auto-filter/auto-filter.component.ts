import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FilterItem } from '../data.models';
import { FilterItemByNamePipe } from '../pipes/filter-item-by-name.pipe';

@Component({
  selector: 'app-auto-filter',
  templateUrl: './auto-filter.component.html',
  styleUrls: ['./auto-filter.component.css']
})
export class AutoFilterComponent<T extends FilterItem = FilterItem> implements OnChanges{
  @Input() list:T[] = [];
  @Input() labelText = '';
  @Input() value = '';
  @Output() itemSelected = new EventEmitter<T>();
  @Output() valueChange = new EventEmitter<string>();
  
  search: string = '';
  showList: boolean = false;
  showZeroState: boolean = false;
  defaultLimit: number = 5;
  limitToShow: number = this.defaultLimit;
  listLength: number = 0;
  increment: number = 5;

  constructor(private filterItemsByName:FilterItemByNamePipe, private elementRef: ElementRef){
  }

  ngOnChanges(changes: SimpleChanges): void {
    if('list' in changes){
      this.listLength = this.list.length;
      console.log('auto filter search init',this.listLength);
    }
  }

  searchChange(): void {
    console.log('auto filter search change');
    this.listLength = this.filterItemsByName.transform(this.list, this.search).length;
    console.log('auto filter search change',this.listLength);
    this.showZeroState = this.listLength === 0;
  }

  onSelectOption(event: Event, itemIn:unknown): void{
    event.stopPropagation();
    console.log('on auto filter select option', itemIn);
    const item = itemIn as T;
    this.search = item.name;
    this.valueChange.emit(item.id as string);// for 2 way data binding
    this.itemSelected.emit(item);// just in case someone need the object
    this.showList = false;
    this.searchChange();
  }

  searchFocusIn(): void{
    console.log('on auto filter show list');
    this.showList = true;
  }

  /*
  searchFocusOut(): void{
    console.log('on auto filter hide list');
    fromEvent(this.elementRef.nativeElement,'focusout')
    .pipe( debounceTime(300))
    .subscribe(item=>{
      console.log("in the focus out")
      this.showList = false;
    })
  }*/

  clearSearch(): void{
    this.search = '';
    this.limitToShow = this.defaultLimit;
    this.showList = false;
    this.itemSelected.emit(undefined);
    this.valueChange.emit(undefined);
    this.searchChange();
  }

  showMore(): void{
    this.limitToShow = this.limitToShow + this.increment;
    console.log('auto filter show limit', this.limitToShow, this.listLength);
  }

  itemTrackBy(index:number, item: FilterItem ): number | string {
    return item?.id;
  }
}
