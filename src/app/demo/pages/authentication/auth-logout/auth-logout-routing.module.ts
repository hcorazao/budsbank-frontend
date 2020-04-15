import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthLogoutComponent} from './auth-logout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthLogoutRoutingModule { }
