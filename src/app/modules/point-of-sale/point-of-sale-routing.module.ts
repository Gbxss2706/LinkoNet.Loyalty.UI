import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointOfSaleComponent } from './point-of-sale.component';
import { PointOfSaleGeneralComponent } from './point-of-sale-general/point-of-sale-general.component';
import { PointOfSaleProfileComponent } from './point-of-sale-profile/point-of-sale-profile.component';

const routes: Routes = [
  {
    path: '', 
    component: PointOfSaleComponent,
  },
  {
    path: 'create-pos',
    component: PointOfSaleGeneralComponent
  },
  {
    path: 'profile-pos',
    component: PointOfSaleProfileComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PointOfSaleRoutingModule { }
