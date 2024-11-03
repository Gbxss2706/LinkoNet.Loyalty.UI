import { Component, OnInit } from '@angular/core';
import { PointOfSale } from '../models/point-of-sale-model';
import { createPOSFactory } from '../factories/point-of-sale-factory';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PointOfSaleService } from '../service/point-of-sale.service';
import plansData from '../configs/bussines-rules.json';
import { Plan, PlanResponse } from '../models/plan-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-point-of-sale-general',
  templateUrl: './point-of-sale-general.component.html',
  styleUrl: './point-of-sale-general.component.scss'
})
export class PointOfSaleGeneralComponent implements OnInit {
  public pointOfSaleForm!: FormGroup;
  public pointOfSaleScheduleForm!: FormGroup;
  protected planResponse!: PlanResponse;
  public touchedOrDirtyFields: Set<string> = new Set<string>();
  public readonly nameRegex: string = "^[a-zA-Z]{3,}$";
  public readonly numberRegex: string = "^[0-9]{6,}$";
  public readonly lableValidClassValue: string = "text-green-700 dark:text-green-500";
  public readonly lableInvalidClassValue: string = "text-red-700 dark:text-red-500";
  public readonly inputValidClassValue: string = "border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 block dark:bg-gray-700 dark:border-green-500";
  public readonly inputInvalidClassValue: string = "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
  public readonly paragraphValidClassValue: string = "mt-2 text-sm text-green-600 dark:text-green-500";
  public readonly paragraphInvalidClassValue: string = "mt-2 text-sm text-red-600 dark:text-red-500";
  public imageSrc: string | ArrayBuffer | null = null;
  public imageBase64: string | null = null;
  public imageLogoSrc: string | ArrayBuffer | null = null;
  public imageLogoBase64: string | null = null;

  constructor(private fb: FormBuilder, public pointOfSaleService: PointOfSaleService, public router: Router) {
    this.initForm();
  }
  ngOnInit(): void {
    this.planResponse = plansData;
  }

  previewImage(event: any): void {
    const input = event.target;
    if (input.files && input.files[0]) {
      this.displayImage(input.files[0]);
    }
  }

  previewLogoImage(event: any): void {
    const input = event.target;
    if (input.files && input.files[0]) {
      this.displayLogoImage(input.files[0]);
    }
  }

  private displayLogoImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageLogoSrc = reader.result;
      this.imageLogoBase64 = (reader.result as string).split(',')[1];
      this.pointOfSaleForm.get('logo')?.get('extension')?.setValue(file.type);
      this.pointOfSaleForm.get('logo')?.get('codificationBase64')?.setValue(this.imageLogoBase64);
    };
    reader.readAsDataURL(file);
  }

  private displayImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const bannersArray = this.pointOfSaleForm.get('banners') as FormArray;
      const firstBannerGroup = bannersArray.at(0) as FormGroup;
      const multimediaGroup = firstBannerGroup.get('multimedia') as FormGroup;
      if(multimediaGroup){
        this.imageSrc = reader.result;
        this.imageBase64 = (reader.result as string).split(',')[1];
        multimediaGroup.get('codificationBase64')!.setValue(this.imageBase64);
        multimediaGroup.get('extension')!.setValue(file.type);
      }
      
    };
    reader.readAsDataURL(file);
  }

  protected removeImage() {
    this.imageSrc = null;
  }

  protected removeLogoImage() {
    this.imageLogoSrc = null;
  }

  private initForm(): void {
    this.pointOfSaleForm = this.fb.group({
      name: ['', [Validators.required]],
      nit: [''],
      logo: this.fb.group({
        name: [''],
        description: [''],
        codificationBase64: [''],
        extension: ['']
      }),
      address: ['', [Validators.required, Validators.minLength(6)]],
      telephone: ['', [Validators.required, Validators.pattern(this.numberRegex)]],
      email: ['', [Validators.required, Validators.email]],
      description: ['', [Validators.required, Validators.minLength(20)]],
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
    this.pointOfSaleScheduleForm = this.fb.group({
      startSchedule: ['', [Validators.required]],
      endSchedule: ['', [Validators.required]],
    });
  }

  protected onSubmit(): void {
    this.pointOfSaleForm.get('schedule')?.setValue(this.pointOfSaleScheduleForm.get('startSchedule')?.value + ' - ' + this.pointOfSaleScheduleForm.get('endSchedule')?.value);
    this.pointOfSaleForm.get('identificationURL')?.setValue('/' + this.pointOfSaleScheduleForm.get('name')?.value);
    if (this.pointOfSaleForm.valid) {
      const company: PointOfSale = createPOSFactory(this.pointOfSaleForm);
      console.log(company);
      this.pointOfSaleService.createPOS(company).subscribe(pos => {
        console.log(pos);
        this.router.navigate(['/point-of-sale'])
      });
    } else {
    }
  }

  protected addBanner(): void {
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

  protected isTouchedOrDirtyField(posField: string): boolean {
    return this.pointOfSaleForm.get(posField)?.dirty || this.touchedOrDirtyFields.has(posField);
  }

  protected markFieldAsTouchedOrDirty(posField: string): void {
    this.touchedOrDirtyFields.add(posField);
  }

  protected isFieldValid(posField: string): boolean {
    return this.isTouchedOrDirtyField(posField) && this.pointOfSaleForm.get(posField)!.invalid;
  }

  protected setPlan(plan: Plan) {
    this.pointOfSaleForm.get('businessRules')?.get('name')?.setValue(plan.name);
    this.pointOfSaleForm.get('businessRules')?.get('description')?.setValue(plan.description);
    this.pointOfSaleForm.get('businessRules')?.get('maxQuantityClientsGlobal')?.setValue(plan.maxQuantityClientsGlobal);
    this.pointOfSaleForm.get('businessRules')?.get('maxQuantityClientsByMonth')?.setValue(plan.maxQuantityClientsByMonth);
    this.pointOfSaleForm.get('businessRules')?.get('maxQuantityCampaignsGlobal')?.setValue(plan.maxQuantityCampaignsGlobal);
    this.pointOfSaleForm.get('businessRules')?.get('maxQuantityCampaignsByMonth')?.setValue(plan.maxQuantityCampaignsByMonth);
    this.printForm();
  }

  protected printForm() {
    console.log(this.pointOfSaleForm);
  }

  protected isFormValid(): boolean {
    return !this.pointOfSaleForm.valid;
  }

  incrementValue(field: string) {
    const currentVal = this.pointOfSaleForm.get('businessRules')?.get(field)?.value;

    this.pointOfSaleForm.get('businessRules')?.get(field)?.setValue(currentVal + 1);
  }

  decrementValue(field: string) {
    const currentVal = this.pointOfSaleForm.get('businessRules')?.get(field)?.value;
    if (currentVal > 1) {
      this.pointOfSaleForm.get('businessRules')?.get(field)?.setValue(currentVal - 1);
    }
  }

  public onContinue() {
    //this.printForm();
  }
}
