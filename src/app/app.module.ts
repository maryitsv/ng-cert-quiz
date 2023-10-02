import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {QuizMakerComponent} from './quiz-maker/quiz-maker.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { AnswersComponent } from './answers/answers.component';
import { AutoFilterComponent } from './auto-filter/auto-filter.component';
import { FilterItemByNamePipe } from './pipes/filter-item-by-name.pipe';
import { HighlightWordDirective } from './highlight-word.directive';

@NgModule({
  declarations: [
    AppComponent,
    QuizMakerComponent,
    QuizComponent,
    QuestionComponent,
    AnswersComponent,
    AutoFilterComponent,
    FilterItemByNamePipe,
    HighlightWordDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [FilterItemByNamePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
