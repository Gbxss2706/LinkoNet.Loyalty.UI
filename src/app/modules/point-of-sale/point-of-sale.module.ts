import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PointOfSaleComponent } from './point-of-sale.component';
import { PointOfSaleRoutingModule } from './point-of-sale-routing.module';
import { NavbarModule } from '../navbar/navbar.module';
import { MatCardModule } from '@angular/material/card';
import { SalePointComponent } from './sale-point/sale-point.component';
import { CreatePosComponent } from './create-pos/create-pos.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle} from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { PointOfSaleService } from './service/point-of-sale.service';
import { PointOfSaleGeneralComponent } from './point-of-sale-general/point-of-sale-general.component';
import { StepperComponent } from './point-of-sale-general/components/stepper/stepper.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PointOfSaleProfileComponent } from './point-of-sale-profile/point-of-sale-profile.component';
import { StatePipePipe } from './pipes/state-pipe.pipe';
import { PosStatePipe } from './pipes/pos-state.pipe';
import { UsersModule } from '../users/users.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    PointOfSaleComponent,
    SalePointComponent,
    CreatePosComponent,
    PointOfSaleGeneralComponent,
    StepperComponent,
    PointOfSaleProfileComponent,
    StatePipePipe,
    PosStatePipe
    
  ],
  imports: [
    CommonModule,
    PointOfSaleRoutingModule,
    NavbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose, 
    MatButtonModule, 
    MatStepperModule, 
    MatButtonModule, 
    ReactiveFormsModule, 
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    FlexLayoutModule,
    UsersModule,
    QRCodeModule
  ],
  providers: [PointOfSaleService]
})
export class PointOfSaleModule { }
