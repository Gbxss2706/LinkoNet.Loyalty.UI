import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoyaltyRegisterComponent } from './loyalty-register.component';

const routes: Routes = [
  {
    path:'', 
    component: LoyaltyRegisterComponent,
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
export class LoyaltyRegisterRoutingModule { }
