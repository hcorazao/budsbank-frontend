import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewDispensaryComponent } from './view-dispensary.component';

const routes: Routes = [
  {
    path: '',
    component: ViewDispensaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewDispensaryRoutingModule { }
