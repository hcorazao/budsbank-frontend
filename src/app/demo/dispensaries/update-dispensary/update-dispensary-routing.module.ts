import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateDispensaryModule } from './update-dispensary.module';
import { UpdateDispensaryComponent } from './update-dispensary.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateDispensaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateDispensariesRoutingModule { }
