import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisabledDispensariesModule } from './disabled-dispensaries.module';
import { DisabledDispensariesComponent } from './disabled-dispensaries.component';

const routes: Routes = [
  {
    path: '',
    component: DisabledDispensariesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisabledDispensariesRoutingModule { }
