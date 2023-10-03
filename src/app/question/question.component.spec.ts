import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionComponent } from './question.component';

describe('QuestionComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionComponent]
    });
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.questionIndex = 1;
    component.question = {
      question: "",
      correct_answer: "d",
      incorrect_answers: ["a","b","c"],
      all_answers: ["a","b","c","d"]
    };
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
