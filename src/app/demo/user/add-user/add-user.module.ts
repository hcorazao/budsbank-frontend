import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserRoutingModule } from './add-user-routing.module'
import { AddUserComponent } from './add-user.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../theme/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [AddUserComponent],
  imports: [
    CommonModule,
    AddUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SweetAlert2Module,
    FileUploadModule
  ]
})
export class AddUserModule { }
