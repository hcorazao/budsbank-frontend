import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisabledDispensariesComponent } from './disabled-dispensaries.component';
import { DisabledDispensariesRoutingModule } from './disabled-dispensaries-routing.module';
import { SharedModule } from '../../../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [DisabledDispensariesComponent],
  imports: [
    CommonModule,
    SweetAlert2Module,
    DataTablesModule,
    SharedModule,
    DisabledDispensariesRoutingModule
  ]
})
export class DisabledDispensariesModule { }
