import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDispensaryComponent } from './add-dispensary.component';

const routes: Routes = [
  {
    path: '',
    component: AddDispensaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddDispensaryRoutingModule { }
