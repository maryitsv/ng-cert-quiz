import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, catchError, map, Observable, of, shareReplay, tap} from 'rxjs';
import {Category, Difficulty, ApiQuestion, Question, Results, SubCategory} from './data.models';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private API_URL = "https://opentdb.com/";
  private latestResults!: Results;
  private subjectCategories = new BehaviorSubject<Category[]>([]);
  categoriesStored$: Observable<Category[]> = this.subjectCategories.asObservable();

  constructor(private http: HttpClient) {
  }

  initialize(){
    this.http.get<{ trivia_categories: Category[] }>(this.API_URL + "api_category.php").pipe(
      map(res => {
        return this.processCategories(res.trivia_categories);
      }),
      tap(items => console.log(items)),
      catchError(error => {
        console.log('Error getting the data', error);
        return [];
      })
    ).subscribe(categories => this.subjectCategories.next(categories));
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoriesStored$;
  }

  getSubcategoryByCategoryId(categoryId:string):Observable<SubCategory[]> {
    return this.categoriesStored$.pipe(
      map( (categories: Category[])=> {
        console.log('busca subcategory')
        const categoryFound = categories.find( category => (category.id as unknown as string)== categoryId);
        if (categoryFound) {
          return categoryFound?.subCategories;
        }

        return [];
      })
    );
  }

  processCategories(categoriesRaw: Category[]): Category[]{
    const categories : {[key: string]: Category} = {};

    categoriesRaw.map( category =>{
      const categoryNameTriviaSplited = category.name?.split(':');
      const categoryName = categoryNameTriviaSplited[0];
      // this is science or geography
      const subcategory = categoryNameTriviaSplited[1];

      if (!categories.hasOwnProperty(categoryName)){
        categories[categoryName] = {
          name : categoryName,
          id: category.id,
          subCategories: []
        }
      }

      if (subcategory) {
        categories[categoryName].subCategories.push({id: category.id, name: subcategory});
      }
    });

    return Object.values(categories);
  }

  createQuiz(categoryId: string, difficulty: Difficulty): Observable<Question[]> {
    return this.http.get<{ results: ApiQuestion[] }>(
        `${this.API_URL}/api.php?amount=5&category=${categoryId}&difficulty=${difficulty?.toLowerCase()}&type=multiple`)
      .pipe(
        map(res => {
          const quiz: Question[] = res.results.map(q => (
            {...q, all_answers: [...q.incorrect_answers, q.correct_answer].sort(() => (Math.random() > 0.5) ? 1 : -1)}
          ));
          return quiz;
        })
      );
  }

  computeScore(questions: Question[], answers: string[]): void {
    let score = 0;
    questions.forEach((q, index) => {
      if (q.correct_answer == answers[index])
        score++;
    })
    this.latestResults = {questions, answers, score};
  }

  getLatestResults(): Results {
    return this.latestResults;
  }
}
