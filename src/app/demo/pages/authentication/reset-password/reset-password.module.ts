import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SweetAlert2Module,
    NgxSpinnerModule
  ],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }
