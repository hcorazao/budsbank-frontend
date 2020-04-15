import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add',   
        loadChildren: './add-quiz/add-quiz.module#AddQuizModule'
      },
      {
        path: 'all',
        loadChildren: './quiz-list/quiz-list.module#QuizListModule'
      },
      {
        path: 'questions',
        loadChildren: './quiz-questions/quiz-questions.module#QuizQuestionsModule'
      },
      {
        path: ':id',
        loadChildren: './quiz-detail/quiz-detail.module#QuizDetailModule'
      }
      // {
      //   path: 'disabled',
      //   pathMatch: 'full',
      //   loadChildren: './disabled-users/disabled-users.module#DisabledUsersModule'
      // },
      // {
      //   path: ':id',
      //   loadChildren: './view-user/view-user.module#ViewUserModule'
      // },
      // {
      //   path: 'update/:id',
      //   loadChildren: './update-user/update-user.module#UpdateUserModule'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizesRoutingModule { }