import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersComponent } from './answers.component';
import { QuestionComponent } from '../question/question.component';

describe('AnswersComponent', () => {
  let component: AnswersComponent;
  let fixture: ComponentFixture<AnswersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnswersComponent, QuestionComponent]
    });
    fixture = TestBed.createComponent(AnswersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.data = {
      questions: [{
        question: "",
        correct_answer: "d",
        incorrect_answers: ["a", "b", "c"],
        all_answers: ["a", "b", "c", "d"]
      }],
      answers: [],
      score: 0
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
