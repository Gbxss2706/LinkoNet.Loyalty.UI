import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FortuneWheelComponent } from './components/fortune-wheel/fortune-wheel.component';
import { RewardsRoutingModule } from './rewards-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FortuneWheelComponent
  ],
  imports: [
    CommonModule,
    RewardsRoutingModule,
    ReactiveFormsModule
  ]
})
export class RewardsModule { }
