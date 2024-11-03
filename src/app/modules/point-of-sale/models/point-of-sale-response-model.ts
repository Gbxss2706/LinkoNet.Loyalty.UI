import { PointOfSale } from "./point-of-sale-model";

export interface PointOfSaleRS extends PointOfSale{
    creationDate : string;
    modificationDate: string;
    pointOfSaleId: number;
}
