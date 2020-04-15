import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';

import { VoucherRoutingModule } from './voucher-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VoucherRoutingModule
  ]
})
export class VoucherModule { }
