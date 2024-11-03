import { PointOfSale } from "../../point-of-sale/models/point-of-sale-model";
import { Campaing } from "./campaing.model";

export interface CampaingRS extends Campaing{
    campaignId : number,
    pointOfSaleId : number, 
    pointOfSale : PointOfSale
}