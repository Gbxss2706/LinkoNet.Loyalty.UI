import { FormArray, FormGroup } from "@angular/forms";
import { PointOfSale } from "../models/point-of-sale-model";

export function createPOSFactory(formGroup: FormGroup): PointOfSale {
  return {
    name: formGroup.get('name')!.value,
    nit: formGroup.get('nit')!.value,
    logo: {
      name: formGroup.get('logo.name')!.value,
      description: formGroup.get('logo.description')!.value,
      codificationBase64: formGroup.get('logo.codificationBase64')!.value,
      extension: formGroup.get('logo.extension')!.value,
    },
    address: formGroup.get('address')!.value,
    telephone: formGroup.get('telephone')!.value,
    email: formGroup.get('email')!.value,
    description: formGroup.get('description')!.value,
    schedule: formGroup.get('schedule')!.value,
    state: formGroup.get('state')!.value,
    businessRules: {
      name: formGroup.get('businessRules.name')!.value,
      description: formGroup.get('businessRules.description')!.value,
      maxQuantityClientsGlobal: formGroup.get('businessRules.maxQuantityClientsGlobal')!.value,
      maxQuantityClientsByMonth: formGroup.get('businessRules.maxQuantityClientsByMonth')!.value,
      maxQuantityCampaignsGlobal: formGroup.get('businessRules.maxQuantityCampaignsGlobal')!.value,
      maxQuantityCampaignsByMonth: formGroup.get('businessRules.maxQuantityCampaignsByMonth')!.value,
    },
    identificationURL: formGroup.get('identificationURL')!.value,
    codeQR: formGroup.get('codeQR')!.value,
    landingPageURL: formGroup.get('landingPageURL')!.value,
    banners: formGroup.get('banners')!.value.map((bannerForm: any) => ({
      multimedia: {
        name: bannerForm.multimedia.name,
        description: bannerForm.multimedia.description,
        codificationBase64: bannerForm.multimedia.codificationBase64,
        extension: bannerForm.multimedia.extension,
      },
    })),
    globalEmailCampaign: '',
    globalEmailCampaignPassword: ''
  };
}