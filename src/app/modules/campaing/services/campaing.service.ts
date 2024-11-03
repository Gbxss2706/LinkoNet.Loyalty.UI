import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from '../../../../enviroment/api-config/api.configuration';
import { Campaing } from '../models/campaing.model';
import { CampaingRS } from '../models/campaing-rs.model';

@Injectable({
  providedIn: 'root'
})
export class CampaingService {

  constructor(private http: HttpClient) { }

  getAllCampaings(): Observable<CampaingRS[]> {
    return this.http.post<CampaingRS[]>(`${apiConfig.loyaltyApiUrl}/Campaign/getAll`, {});
  }

  createCampaing( pointOfSale : Campaing): Observable<CampaingRS> {
    return this.http.post<CampaingRS>(`${apiConfig.loyaltyApiUrl}/Campaign/create`, pointOfSale);
  }

  activateCampaign( campaignId : number): Observable<CampaingRS> {
    return this.http.post<CampaingRS>(`${apiConfig.loyaltyApiUrl}/Campaign/activate/${campaignId}`, {});
  }

  getCampaingById( pointOfSaleId : number): Observable<CampaingRS[]> {
    return this.http.post<CampaingRS[]>(`${apiConfig.loyaltyApiUrl}/Campaign/getByPointOfSale/${pointOfSaleId}`, {});
  }
}
