import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFilterComponent } from './auto-filter.component';
import { FilterItemByNamePipe } from '../pipes/filter-item-by-name.pipe';

describe('AutoFilterComponent', () => {
  let component: AutoFilterComponent;
  let fixture: ComponentFixture<AutoFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoFilterComponent],
      providers:[FilterItemByNamePipe]
    });
    fixture = TestBed.createComponent(AutoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
