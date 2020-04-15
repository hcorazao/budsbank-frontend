import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signup',
        loadChildren: './auth-signup/auth-signup.module#AuthSignupModule'
      },
      {
        path: 'signin',
        loadChildren: './auth-signin/auth-signin.module#AuthSigninModule'
      },
      {
        path: 'forget',
        loadChildren: './forget-password/forget-password.module#ForgetPasswordModule'
      },
      {
        path: 'reset/:id',
        loadChildren: './reset-password/reset-password.module#ResetPasswordModule'
      },
      {
        path: 'logout',
        loadChildren: './auth-logout/auth-logout.module#AuthLogoutModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
