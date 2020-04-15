import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizQuestionsComponent } from './quiz-questions.component';
import { QuizQuestionsRoutingModule } from './quiz-questions-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../theme/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [QuizQuestionsComponent],
  imports: [
    CommonModule,
    QuizQuestionsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SweetAlert2Module,
    SelectDropDownModule,
    NgxSpinnerModule

  ]
})
export class QuizQuestionsModule { }
