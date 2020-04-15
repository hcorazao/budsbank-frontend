import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DispensariesListComponent } from './dispensaries-list.component';
import { DispensariesListRoutingModule} from './dispensaries-list-routing.module';
import { SharedModule } from '../../../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [DispensariesListComponent],
  imports: [
    CommonModule,
    DispensariesListRoutingModule,
    SharedModule,
    DataTablesModule,
    SweetAlert2Module
  ]
})
export class DispensariesListModule { }
