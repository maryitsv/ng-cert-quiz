import {Component, inject, Input} from '@angular/core';
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

  changeQuestion(index:number): void{

    if (this.questions) {
      this.quizService.changeQuestion(this.questions, index);
      // remove that answer
      this.userAnswers.splice(index,1);
    }

  }
}
