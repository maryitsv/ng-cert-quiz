import {Component} from '@angular/core';
import {Category, Difficulty, Question, SubCategory} from '../data.models';
import {Observable, filter, last, map, pipe, take} from 'rxjs';
import {QuizService} from '../quiz.service';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent {
  readonly defaultSubCategory: string = 'Select subcategory';
  readonly defaultCategory: string = 'Select category';
  readonly defaultDifficulty: string = 'Select difficulty';

  categories$: Observable<Category[]>;
  subCategories$!: Observable<SubCategory[]>;
  questions$!: Observable<Question[]>;
  categorySelected: string = this.defaultCategory;
  subCategorySelected: string = this.defaultSubCategory;
  difficultySelected: string = this.defaultDifficulty;


  constructor(protected quizService: QuizService) {
    this.categories$ = quizService.getAllCategories();
  }

  buildCategoryId(): string{
    let categoryId: string = '';
    
    if (this.subCategorySelected !== this.defaultSubCategory) {
      categoryId = this.subCategorySelected;
    } else {
      this.subCategories$?.pipe(take(1)).subscribe(subcategories => {
        if (subcategories.length > 0) {
          // in this case the user shoudl pick a subcategory
          console.log('Hey the user shoul pick a subcategory');
          categoryId = this.defaultSubCategory;
        } else {
          categoryId = this.categorySelected;
        }
      });
    }

    return categoryId;
  }

  createQuiz(): void {
    console.log('createQuiz category', this.categorySelected);
    console.log('createQuiz subCategorySelected', this.subCategorySelected);
    console.log('createQuiz difficultySelected', this.difficultySelected);
    const categoryId = this.buildCategoryId();
    this.questions$ = this.quizService.createQuiz(categoryId , this.difficultySelected as Difficulty);
  }

  changeSubCategories(cat:string): void{
    console.log('changeSubCategories by categoryId', cat);
    this.subCategorySelected = 'Select subcategory';
    this.subCategories$ = this.quizService.getSubcategoryByCategoryId(cat);
  }
}
