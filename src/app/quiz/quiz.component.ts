import {Component, inject, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Question} from '../data.models';
import {QuizService} from '../quiz.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnChanges{

  @Input()
  questions: Question[] | null = [];

  userAnswers: (string | null )[] = [];
  showSubmit: boolean = false;
  quizService = inject(QuizService);
  router = inject(Router);

  showChangeQuestionButton$:Observable<boolean> = this.quizService.allowQuestionChange$;

  ngOnChanges(): void {
    this.userAnswers = [];
    this.checkSubmitVisibility();
  }

  submit(): void {
    this.quizService.computeScore(this.questions ?? [], this.userAnswers as string[]);
    this.router.navigateByUrl("/result");
  }

  changeAnswer(answer:string, index:number):void {
    this.userAnswers[index] = answer;
    this.checkSubmitVisibility();
  }

  checkSubmitVisibility(){
    this.showSubmit = this.userAnswers.filter(item=> item !== null).length === 5;
  }

  changeQuestion(index:number): void{

    if (this.questions) {
      this.quizService.changeQuestion(this.questions, index);
      // remove that answer
      this.userAnswers[index] = null;
      this.checkSubmitVisibility();
    }
  }
}
