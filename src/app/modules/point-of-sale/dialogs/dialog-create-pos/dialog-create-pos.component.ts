import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import {MatStepperModule} from '@angular/material/stepper';
import { PointOfSale } from '../../models/point-of-sale-model';
import { createPOSFactory } from '../../factories/point-of-sale-factory';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PointOfSaleService } from '../../service/point-of-sale.service';

@Component({
  selector: 'app-dialog-create-pos',
  templateUrl: './dialog-create-pos.component.html',
  styleUrl: './dialog-create-pos.component.scss',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatStepperModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, FlexLayoutModule],
})
export class DialogCreatePosComponent {

  public pointOfSaleForm!: FormGroup;

  constructor(private fb: FormBuilder, public pointOfSaleService: PointOfSaleService) {
    this.initForm();
  }

  initForm(): void {
    this.pointOfSaleForm = this.fb.group({
      name: ['', Validators.required],
      nit: ['', Validators.required],
      logo: this.fb.group({
        name: [''],
        description: [''],
        codificationBase64: [''],
        extension: ['']
      }),
      address: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      description: [''],
      schedule: [''],
      state: [true],
      businessRules: this.fb.group({
        name: [''],
        description: [''],
        maxQuantityClientsGlobal: [0],
        maxQuantityClientsByMonth: [0],
        maxQuantityCampaignsGlobal: [0],
        maxQuantityCampaignsByMonth: [0]
      }),
      identificationURL: [''],
      codeQR: [''],
      landingPageURL: [''],
      banners: this.fb.array([
        this.fb.group({
          multimedia: this.fb.group({
            name: [''],
            description: [''],
            codificationBase64: [''],
            extension: ['']
          })
        })
      ])
    });
  }

  onSubmit(): void {
    if (this.pointOfSaleForm.valid) {
      const company: PointOfSale = createPOSFactory(this.pointOfSaleForm);
      console.log(company);
      this.pointOfSaleService.createPOS(company).subscribe( pos => {
        console.log(pos);
      });
    } else {
    }
  }

  addBanner(): void {
    const banners = this.pointOfSaleForm.get('banners') as FormArray;
    banners.push(this.fb.group({
      multimedia: this.fb.group({
        name: [''],
        description: [''],
        codificationBase64: [''],
        extension: ['']
      })
    }));
  }

}
