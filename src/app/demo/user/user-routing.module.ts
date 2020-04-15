import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add',   
        loadChildren: './add-user/add-user.module#AddUserModule'
      },
      {
        path: 'all',
        loadChildren: './users-list/users-list.module#UsersListModule'
      },
      {
        path: 'disabled',
        pathMatch: 'full',
        loadChildren: './disabled-users/disabled-users.module#DisabledUsersModule'
      },
      {
        path: ':id',
        loadChildren: './view-user/view-user.module#ViewUserModule'
      },
      {
        path: 'update/:id',
        loadChildren: './update-user/update-user.module#UpdateUserModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }