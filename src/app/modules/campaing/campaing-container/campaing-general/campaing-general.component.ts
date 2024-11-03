import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnumCampaignChannel } from '../../enums/channels.enum';
import { EnumStatusCampaing } from '../../enums/status.enum';
import { PointOfSaleService } from '../../../point-of-sale/service/point-of-sale.service';
import { PointOfSaleRS } from '../../../point-of-sale/models/point-of-sale-response-model';
import { createCampaingFactory } from '../../factories/campaing-factory';
import { CampaingService } from '../../services/campaing.service';
import { Router } from '@angular/router';
import { ConfigOptionsPOS } from '../../../point-of-sale/models/config-options-point-of-sale-model';

@Component({
  selector: 'app-campaing-general',
  templateUrl: './campaing-general.component.html',
  styleUrl: './campaing-general.component.scss'
})
export class CampaingGeneralComponent implements OnInit{
  public readonly numberRegex: string = "^[0-9]{6,}$";
  public readonly lableValidClassValue: string = "text-green-700 dark:text-green-500";
  public readonly lableInvalidClassValue: string = "text-red-700 dark:text-red-500";
  public readonly inputValidClassValue: string = "border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 block dark:bg-gray-700 dark:border-green-500";
  public readonly inputInvalidClassValue: string = "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
  public readonly paragraphValidClassValue: string = "mt-2 text-sm text-green-600 dark:text-green-500";
  public readonly paragraphInvalidClassValue: string = "mt-2 text-sm text-red-600 dark:text-red-500";
  EnumCampaignChannel = EnumCampaignChannel;
  public pointOfSaleArray: PointOfSaleRS[] = [];

  constructor(private fb: FormBuilder, private pointOfSaleService: PointOfSaleService, private campaingService: CampaingService, private router: Router) {
    this.initForm();
  }

  campaingForm!: FormGroup;
  public touchedOrDirtyFields: Set<string> = new Set<string>();

  ngOnInit(): void {
    this.internalInit();
  }

  private initForm(): void{
      this.campaingForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        enumCanal: ['', [Validators.required]],
        startDate: ['', Validators.required],
        endDate: ['', Validators.required],
        status: [EnumStatusCampaing.Created, Validators.required],
        description: ['', [Validators.required, Validators.minLength(20)]],
        additionalData: ['', [Validators.required]],
        additionalData2: [''],
        additionalData3: [''],
        additionalData4: [''],
        additionalData5: [''],
        additionalData6: [''],
        additionalData7: [''],
        additionalData8: [''],
        additionalData9: [''],
        additionalData10: [''],
        pointOfSaleId: ['', Validators.required]
      });
  }

  private internalInit(): void{
    const userPointOfSale = this.getUserPointOfSale();
    if(userPointOfSale){
      const userPointOfSaleArray = userPointOfSale.split(',').map(pos => pos.trim());
      const configOptionsPOS: ConfigOptionsPOS = {
        getBusinessRules: true,
        getMultimedia: true
      }
      userPointOfSaleArray.forEach(posId => {
        this.pointOfSaleService.getPOSById(configOptionsPOS, posId).subscribe(
          (pointOfSale:PointOfSaleRS) =>{
            if(pointOfSale){
              this.pointOfSaleArray.push(pointOfSale);
              console.log(this.pointOfSaleArray);
            }
          }
        );
      });
    }
  }

  protected onSubmit(): void{
    if (this.campaingForm.valid){
      const campaignRequest = createCampaingFactory(this.campaingForm);
      this.campaingService.createCampaing(campaignRequest).subscribe(campaignRS => {
        if(campaignRS){
          this.router.navigate(['/campaing']);
        }
      });
    }
  }

  protected isTouchedOrDirtyField(posField: string): boolean {
    return this.campaingForm.get(posField)?.dirty || this.touchedOrDirtyFields.has(posField);
  }

  protected markFieldAsTouchedOrDirty(posField: string): void {
    this.touchedOrDirtyFields.add(posField);
  }

  protected isFieldValid(posField: string): boolean {
    return this.isTouchedOrDirtyField(posField) && this.campaingForm.get(posField)!.invalid;
  }

  protected setMainChannel(channel: EnumCampaignChannel){
    this.campaingForm.get('enumCanal')?.setValue(channel);
  }

  protected setMainPos(pointOfSale: PointOfSaleRS){
    this.campaingForm.get('pointOfSaleId')?.setValue(pointOfSale.pointOfSaleId);
    this.campaingForm.get('additionalData3')?.setValue(pointOfSale.telephone);
  }

  protected hasUserPointOfSale():boolean{
    return !!this.getUserPointOfSale();
  }

  protected getUserPointOfSale(): string | null{
    return sessionStorage.getItem("userPointOfSale");
  }
}
