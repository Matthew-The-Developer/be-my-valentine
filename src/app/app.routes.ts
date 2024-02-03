import { Routes } from '@angular/router';
import { QuestionComponent } from './question/question.component';
import { AnswerComponent } from './answer/answer.component';

export const routes: Routes = [
  { path: 'question', component: QuestionComponent },
  { path: 'yay', component: AnswerComponent },
  { path: '**', redirectTo: 'question', pathMatch: 'full' },
];
