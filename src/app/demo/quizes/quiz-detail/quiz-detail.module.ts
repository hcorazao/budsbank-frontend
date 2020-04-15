import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizDetailComponent } from './quiz-detail.component';
import { QuizDetailRoutingModule } from './quiz-detail-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from '../../../theme/shared/shared.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [QuizDetailComponent],
  imports: [
    CommonModule,
    QuizDetailRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SweetAlert2Module,
    SelectDropDownModule,
    NgxSpinnerModule
  ]
})
export class QuizDetailModule { }
