import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisabledUsersComponent } from './disabled-users.component';
import { DisabledUsersRoutingModule } from './disabled-users-routing.module';
import { SharedModule } from '../../../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [DisabledUsersComponent],
  imports: [
    CommonModule,
    DisabledUsersRoutingModule,
    SharedModule,
    DataTablesModule,
    SweetAlert2Module
  ]
})
export class DisabledUsersModule { }
