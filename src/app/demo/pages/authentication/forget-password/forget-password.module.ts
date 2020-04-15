import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ForgetPasswordComponent } from './forget-password.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
 imports: [
    CommonModule,
    ForgetPasswordRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SweetAlert2Module,
    NgxSpinnerModule
  ],
  declarations: [ForgetPasswordComponent]
})
export class ForgetPasswordModule { }
