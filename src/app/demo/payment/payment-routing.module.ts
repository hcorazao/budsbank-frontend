import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'info',   
        loadChildren: './payment-info/payment-info.module#PaymentInfoModule'
      },
      {
        path: 'all',
        loadChildren: './transactions-list/transactions-list.module#TransactionsListModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }