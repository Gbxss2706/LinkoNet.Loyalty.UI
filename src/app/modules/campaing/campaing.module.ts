import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaingContainerComponent } from './campaing-container/campaing-container.component';
import { CampaingRoutingModule } from './campaing-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { CampaingGeneralComponent } from './campaing-container/campaing-general/campaing-general.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { PointOfSaleService } from '../point-of-sale/service/point-of-sale.service';
import { CampaingService } from './services/campaing.service';

@NgModule({
  declarations: [
    CampaingContainerComponent,
    CampaingGeneralComponent
  ],
  imports: [
    CommonModule,
    CampaingRoutingModule,
    NavbarModule,
    MatStepperModule,
    FlexLayoutModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  providers:[PointOfSaleService, CampaingService]
})
export class CampaingModule { }
