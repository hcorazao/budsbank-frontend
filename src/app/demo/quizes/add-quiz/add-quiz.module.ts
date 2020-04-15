import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddQuizComponent } from './add-quiz.component';
import { AddQuizRoutingModule } from './add-quiz-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../theme/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FileUploadModule } from 'ng2-file-upload';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AddQuizComponent],
  imports: [
    CommonModule,
    AddQuizRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SweetAlert2Module,
    FileUploadModule,
    SelectDropDownModule,
    NgxSpinnerModule
  ]
})
export class AddQuizModule { }
