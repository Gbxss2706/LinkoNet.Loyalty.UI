import { PointOfSaleRS } from "../../modules/point-of-sale/models/point-of-sale-response-model";

export interface Client {
    recordClientId: number,
    date: string,
    email: string,
    name: string, 
    telephone: number,
    additionalData: string,
    pointOfSaleId: number, 
    pointOfSale: PointOfSaleRS
}