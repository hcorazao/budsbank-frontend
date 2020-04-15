import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentInfoRoutingModule } from './payment-info-routing.module';
import { PaymentInfoComponent } from './payment-info.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [PaymentInfoComponent],
  imports: [
    CommonModule,
    PaymentInfoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class PaymentInfoModule { }
