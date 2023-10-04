import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FilterItem } from '../data.models';
import { FilterItemByNamePipe } from '../pipes/filter-item-by-name.pipe';

@Component({
  selector: 'app-auto-filter',
  templateUrl: './auto-filter.component.html',
  styleUrls: ['./auto-filter.component.css']
})
export class AutoFilterComponent<T extends FilterItem = FilterItem> implements OnChanges {
  @Input() list: T[] = [];
  @Input() labelText = '';
  @Input() value = '';
  @Output() itemSelected = new EventEmitter<T>();
  @Output() valueChange = new EventEmitter<string>();
  @ViewChild('inputSearch') inputSearch: ElementRef | undefined;
  @ViewChild('listOptions',{static:false}) listOptions: ElementRef | undefined;

  search: string = '';
  showList: boolean = false;
  showZeroState: boolean = false;
  defaultLimit: number = 5;
  limitToShow: number = this.defaultLimit;
  listLength: number = 0;
  increment: number = 5;
  lastItemSelected: T | undefined= undefined;

  constructor(private filterItemsByName: FilterItemByNamePipe) {
  }


  @HostListener('document:click', ['$event.target'])
  public onClick(target:Event) {
    // close the list if we click outside
    if (
      target !== this.inputSearch?.nativeElement &&
      target !== this.listOptions?.nativeElement
      ) {
      this.clickOutside();
    }
  }

  clickOutside(): void{

    this.showList = false;

    if (this.lastItemSelected === undefined){
      this.value = '';
      this.search = '';
    } else {
      this.search = this.lastItemSelected.name;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('list' in changes) {
      this.listLength = this.list.length;
    }
  }

  searchChange(): void {
    this.listLength = this.filterItemsByName.transform(this.list, this.search).length;
    this.showZeroState = this.listLength === 0 ? true : false;
  }

  onSelectOption(event: Event, itemIn: unknown): void {
    event.stopPropagation();
    const item = itemIn as T;
    this.search = item.name;
    this.value = item.name;
    this.lastItemSelected = item;
    this.valueChange.emit(item.id as string);// for 2 way data binding
    this.itemSelected.emit(item);// just in case someone need the object
    this.showList = false;
    this.searchChange();
  }

  searchFocusIn(): void {
    this.showList = true;
  }

  clearSearch(event: Event): void {
    event.stopPropagation();
    this.search = '';
    this.limitToShow = this.defaultLimit;
    this.showList = false;
    this.lastItemSelected = undefined;
    this.itemSelected.emit(undefined);
    this.valueChange.emit(undefined);
    this.searchChange();
  }

  showMore(event: Event): void {
    event.stopPropagation();
    this.limitToShow = this.limitToShow + this.increment;
  }

  itemTrackBy(index: number, item: FilterItem): number | string {
    return item?.id;
  }
}
