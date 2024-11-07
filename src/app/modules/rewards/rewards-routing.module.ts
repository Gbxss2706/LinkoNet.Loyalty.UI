import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FortuneWheelComponent } from './components/fortune-wheel/fortune-wheel.component';

const routes: Routes = [
  {
    path:'fortune', 
    component: FortuneWheelComponent,
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
export class RewardsRoutingModule { }
