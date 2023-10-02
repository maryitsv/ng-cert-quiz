import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Question} from '../data.models';
import {QuizService} from '../quiz.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {

  @Input()
  questions: Question[] | null = [];

  userAnswers: string[] = [];
  quizService = inject(QuizService);
  router = inject(Router);

  showChangeQuestionButton$:Observable<boolean> = this.quizService.allowQuestionChange$;

  submit(): void {
    this.quizService.computeScore(this.questions ?? [], this.userAnswers);
    this.router.navigateByUrl("/result");
  }

  changeQuestion(event:any, index:number): void{
    console.log('on change question in the quiz component', event);

    if (this.questions) {
      this.quizService.changeQuestion(this.questions, index);
    }

  }
}
