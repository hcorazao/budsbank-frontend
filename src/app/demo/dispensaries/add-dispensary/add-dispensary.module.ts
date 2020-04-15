import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddDispensaryComponent } from './add-dispensary.component';
import { AddDispensaryRoutingModule } from './add-dispensary-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../theme/shared/shared.module';
import { AgmCoreModule } from '@agm/core';
import { FileUploadModule } from 'ng2-file-upload';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [AddDispensaryComponent],
  imports: [
    CommonModule,
    AddDispensaryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FileUploadModule,
    SweetAlert2Module,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAcARFFtUPK8IeCXsVmh5I7CIw4hnxejqU',
      libraries: ['places']
    })
  ]
})
export class AddDispensaryModule { }


// AIzaSyDthHz_mCeEJPZIwRmxkSgjKYnEEkJgedk