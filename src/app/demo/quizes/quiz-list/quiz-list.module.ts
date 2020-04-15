import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizListComponent } from './quiz-list.component';
import { QuizListRoutingModule } from './quiz-list-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../theme/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [QuizListComponent],
  imports: [
    CommonModule,
    QuizListRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SweetAlert2Module,
    SelectDropDownModule,
    NgxSpinnerModule
  ]
})
export class QuizListModule { }
