import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateUserComponent } from './update-user.component';
import { UpdateUserRoutingModule } from './update-user-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../theme/shared/shared.module';
import { FileUploadModule } from 'ng2-file-upload';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [UpdateUserComponent],
  imports: [
    CommonModule,
    UpdateUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FileUploadModule,
    SweetAlert2Module
  ]
})
export class UpdateUserModule { }
