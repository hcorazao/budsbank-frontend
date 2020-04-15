import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthSignupRoutingModule } from './auth-signup-routing.module';
import { AuthSignupComponent } from './auth-signup.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    AuthSignupRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    SweetAlert2Module,
    NgxSpinnerModule
  ],
  declarations: [AuthSignupComponent]
})
export class AuthSignupModule { }
