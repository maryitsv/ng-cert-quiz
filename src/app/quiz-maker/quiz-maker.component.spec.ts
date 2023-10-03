import {ComponentFixture, TestBed} from '@angular/core/testing';

import {QuizMakerComponent} from './quiz-maker.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizComponent } from '../quiz/quiz.component';
import { AutoFilterComponent } from '../auto-filter/auto-filter.component';
import { FilterItemByNamePipe } from '../pipes/filter-item-by-name.pipe';
import { FormsModule } from '@angular/forms';

describe('QuizMakerComponent', () => {
  let component: QuizMakerComponent;
  let fixture: ComponentFixture<QuizMakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientTestingModule, FormsModule],
      declarations: [QuizMakerComponent, QuizComponent, AutoFilterComponent],
      providers:[FilterItemByNamePipe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(QuizMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
