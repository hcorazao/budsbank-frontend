import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizDetailComponent } from './quiz-detail.component';

const routes: Routes = [
  {
    path: '',
    component: QuizDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizDetailRoutingModule { }
