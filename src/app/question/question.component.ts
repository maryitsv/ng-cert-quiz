import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Question} from '../data.models';

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
    if (!this.userAnswer && this.currentSelection === answer) {
      return "tertiary";
    }
    if (this.userAnswer && this.correctAnswer === answer && this.userAnswer === answer) {
      return "tertiary";
    }
    if (this.userAnswer && this.correctAnswer === answer) {
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
