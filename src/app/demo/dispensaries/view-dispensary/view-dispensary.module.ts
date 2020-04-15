import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewDispensaryComponent } from './view-dispensary.component';
import { ViewDispensaryRoutingModule } from './view-dispensary-routing.module';
import { SharedModule } from '../../../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [ViewDispensaryComponent],
  imports: [
    CommonModule,
    ViewDispensaryRoutingModule,
    SharedModule,
    DataTablesModule,
    SweetAlert2Module,
    AgmCoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAcARFFtUPK8IeCXsVmh5I7CIw4hnxejqU',
      libraries: ['places']
    })
  ]
})
export class ViewDispensaryModule { }
