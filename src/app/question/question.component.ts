import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject} from '@angular/core';
import {Question} from '../data.models';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {

  @Input({required: true}) question!: Question;
  @Input({required: true}) questionIndex!: number;
  @Input() correctAnswer?: string;
  @Input() userAnswer?: string;
  @Input() showChangeQuestionButton:boolean | null = false;

  getButtonClass(answer: string): string {
    if (! this.userAnswer) {
        if (this.currentSelection == answer)
          return "tertiary";
    } else {
      if (this.userAnswer == this.correctAnswer && this.userAnswer == answer)
        return "tertiary";
      if (answer == this.correctAnswer)
        return "secondary";
    }
    return "primary";
  }

  @Output()
  change = new EventEmitter<string>();

  @Output() 
  questionChanged = new EventEmitter<Question>();

  currentSelection!: string;


  buttonClicked(answer: string): void {
    this.currentSelection = answer;
    this.change.emit(answer);
  }

  changeQuestion(): void{
    
    this.questionChanged.emit(this.question);
  }
}
