import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from '../../../../enviroment/api-config/api.configuration';
import { ConfigOptionsPOS } from '../models/config-options-point-of-sale-model';
import { PointOfSaleRS } from '../models/point-of-sale-response-model';
import { PointOfSale } from '../models/point-of-sale-model';

@Injectable({
  providedIn: 'root'
})
export class PointOfSaleService {

  constructor(private http: HttpClient) { }

  getAllPOS( configOptionsPOS : ConfigOptionsPOS): Observable<PointOfSaleRS[]> {
    return this.http.post<PointOfSaleRS[]>(`${apiConfig.loyaltyApiUrl}/PointOfSale/getAll`, configOptionsPOS);
  }

  createPOS( pointOfSale : PointOfSale): Observable<PointOfSaleRS> {
    return this.http.post<PointOfSaleRS>(`${apiConfig.loyaltyApiUrl}/PointOfSale/create`, pointOfSale);
  }

  getPOSByName( pointOfSaleId : string): Observable<PointOfSaleRS> {
    return this.http.post<PointOfSaleRS>(`${apiConfig.loyaltyApiUrl}/PointOfSale/getByName/${pointOfSaleId}`, {
      "getMultimedia": true,
      "getBusinessRules": true
    });
  }

  getPOSById( configOptionsPOS: ConfigOptionsPOS, pointOfSaleId : string): Observable<PointOfSaleRS> {
    return this.http.post<PointOfSaleRS>(`${apiConfig.loyaltyApiUrl}/PointOfSale/get/${pointOfSaleId}`, configOptionsPOS);
  }
}
