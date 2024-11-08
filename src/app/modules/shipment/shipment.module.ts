import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShipmentComponent } from './shipment.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ShipmentRoutingModule } from './shipment-routing.module';
import { NavbarModule } from '../navbar/navbar.module';



@NgModule({
  declarations: [
    ShipmentComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ShipmentRoutingModule,
    NavbarModule
  ]
})
export class ShipmentModule { }
