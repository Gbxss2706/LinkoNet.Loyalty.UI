import { PointOfSale } from "../../point-of-sale/models/point-of-sale-model";
import { RecordClient } from "./record-client.model";

export interface recordClientRS extends RecordClient{
    recordClientId: number, 
    date: string,
    pointOfSale : PointOfSale
}