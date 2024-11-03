import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoyaltyRegisterRoutingModule } from './loyalty-register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoyaltyRegisterComponent } from './loyalty-register.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { PointOfSaleService } from '../point-of-sale/service/point-of-sale.service';

@NgModule({
  declarations: [LoyaltyRegisterComponent],
  imports: [
    CommonModule,
    LoyaltyRegisterRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatCardModule
  ],
  providers: [PointOfSaleService]
})
export class LoyaltyRegisterModule { }
