import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLogoutRoutingModule } from './auth-logout-routing.module';
import { AuthLogoutComponent } from './auth-logout.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthLogoutRoutingModule
  ],
   declarations: [AuthLogoutComponent]
})
export class AuthLogoutModule { }
