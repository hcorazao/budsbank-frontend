import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisabledUsersComponent } from './disabled-users.component';

const routes: Routes = [
  {
    path: '',
    component: DisabledUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisabledUsersRoutingModule { }
