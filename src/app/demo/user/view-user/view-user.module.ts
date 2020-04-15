import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewUserComponent } from './view-user.component';
import { ViewUserRoutingModule } from './view-user-routing.module';
import { SharedModule } from '../../../theme/shared/shared.module';

@NgModule({
  declarations: [ViewUserComponent],
  imports: [
    CommonModule,
    ViewUserRoutingModule,
    SharedModule
  ]
})
export class ViewUserModule { }
