import { FormGroup } from "@angular/forms";
import { Campaing } from "../models/campaing.model";

export function createCampaingFactory(formGroup: FormGroup): Campaing {
    return {
        name: formGroup.get('name')!.value,
        enumCanal: formGroup.get('enumCanal')!.value,
        description: formGroup.get('description')!.value,
        startDate: formGroup.get('startDate')!.value,
        endDate: formGroup.get('endDate')!.value,
        status: formGroup.get('status')!.value,
        additionalData: formGroup.get('additionalData')!.value,
        additionalData2:formGroup.get('additionalData2')!.value,
        additionalData3: formGroup.get('additionalData3')!.value,
        additionalData4: formGroup.get('additionalData4')!.value,
        additionalData5: formGroup.get('additionalData5')!.value,
        additionalData6: formGroup.get('additionalData6')!.value,
        additionalData7: formGroup.get('additionalData7')!.value,
        additionalData8: formGroup.get('additionalData8')!.value,
        additionalData9: formGroup.get('additionalData9')!.value,
        additionalData10: formGroup.get('additionalData10')!.value,
        pointOfSaleId: formGroup.get('pointOfSaleId')!.value
    };
}