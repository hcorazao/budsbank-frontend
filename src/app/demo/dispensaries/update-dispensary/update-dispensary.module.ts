import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateDispensaryComponent } from './update-dispensary.component';
import { UpdateDispensariesRoutingModule } from './update-dispensary-routing.module';
import { SharedModule } from '../../../theme/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { AgmCoreModule } from '@agm/core';
import { FileUploadModule } from 'ng2-file-upload';
import swal from 'sweetalert2';

@NgModule({
  declarations: [UpdateDispensaryComponent],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    SweetAlert2Module,
    UpdateDispensariesRoutingModule,
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAcARFFtUPK8IeCXsVmh5I7CIw4hnxejqU',
      libraries: ['places']
    })
  ]
})
export class UpdateDispensaryModule { }
