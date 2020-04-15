import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthComponent } from './theme/layout/auth/auth.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { AdminProfileComponent } from './demo/admin-profile/admin-profile.component';
import { AdminProfileUpdateComponent } from './demo/admin-profile-update/admin-profile-update.component';


var redirectRoute: string = "dashboard/default";

let uData = JSON.parse(localStorage.getItem('userInfo'));
if(uData){
  const role = uData.role;
  if (role === "2" || role === 2) {
    console.log('aaa jaa ywwr');
   redirectRoute = "admin/dispensary/all"
  } else {
    redirectRoute = "dashboard/default"
  }
}

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: redirectRoute,
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: './demo/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'admin/user',
        loadChildren: './demo/user/user.module#UserModule'
      },
      {
        path: 'admin/dispensary',
        loadChildren: './demo/dispensaries/dispensaries.module#DispensariesModule'
      },
      {
        path: 'admin/quiz',
        loadChildren: './demo/quizes/quizes.module#QuizesModule'
      },
      {
        path: 'admin/profile',
        component: AdminProfileComponent
      },
      {
        path: 'admin/profile/update/:id',
        component: AdminProfileUpdateComponent
      },
      {
        path: 'admin/payment',
        loadChildren: './demo/payment/payment.module#PaymentModule'
      },
      {
        path: 'admin/vouchers',
        loadChildren: './demo/vouchers/voucher.module#VoucherModule'
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './demo/pages/authentication/authentication.module#AuthenticationModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
