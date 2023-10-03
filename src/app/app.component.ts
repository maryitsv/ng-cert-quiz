import {Component, OnInit} from '@angular/core';
import { QuizService } from './quiz.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private quizService:QuizService) {

  }

  ngOnInit() {
    this.quizService.initialize();
  }
}
