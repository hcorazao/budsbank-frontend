import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list.component';
import { SharedModule } from '../../../theme/shared/shared.module';
import { UsersListRoutingModule } from './users-list-routing.module';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [UsersListComponent],
  imports: [
    CommonModule,
    SharedModule,
    UsersListRoutingModule,
    DataTablesModule,
    SweetAlert2Module
  ]
})
export class UsersListModule {
 
 }
