import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ViewDispensaryComponent } from './view-dispensary/view-dispensary.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add',   
        loadChildren: './add-dispensary/add-dispensary.module#AddDispensaryModule'
      },
      {
        path: 'all',
        loadChildren: './dispensaries-list/dispensaries-list.module#DispensariesListModule'
      },
      {
        path: 'disabled',
        pathMatch: 'full',
        loadChildren: './disabled-dispensaries/disabled-dispensaries.module#DisabledDispensariesModule'
      },
      {
        path: ':id',
        loadChildren: './view-dispensary/view-dispensary.module#ViewDispensaryModule'
      },
      {
        path: 'update/:id',
        loadChildren: './update-dispensary/update-dispensary.module#UpdateDispensaryModule'
      },
      {
        path: 'profile',
        loadChildren: './view-dispensary/view-dispensary.module#ViewDispensaryModule'
        // component: ViewDispensaryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DispensariesRoutingModule { }