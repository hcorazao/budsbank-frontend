import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsListRoutingModule } from './transactions-list-routing.module';
import { TransactionsListComponent } from './transactions-list.component';

@NgModule({
  declarations: [TransactionsListComponent],
  imports: [
    CommonModule,
    TransactionsListRoutingModule
  ]
})
export class TransactionsListModule { }
