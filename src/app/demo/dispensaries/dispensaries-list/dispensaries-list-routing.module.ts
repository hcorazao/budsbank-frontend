import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DispensariesListComponent } from './dispensaries-list.component';

const routes: Routes = [
  {
    path: '',
    component: DispensariesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispensariesListRoutingModule { }
