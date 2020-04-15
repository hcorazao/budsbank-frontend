import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllRoutingModule } from './all-routing.module';
import {SharedModule} from '../../../theme/shared/shared.module';
import { AllComponent } from './all.component';
import {NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  imports: [
    CommonModule,
    AllRoutingModule,
    SharedModule,
    NgbTabsetModule,
    SweetAlert2Module
  ],
  declarations: [AllComponent]
})
export class AllModule { }
