import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../../models/client-model';
import { apiConfig } from '../../../../enviroment/api-config/api.configuration';

@Injectable({
  providedIn: 'root'
})
export class RecentClientService {

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<Client[]> {
    return this.http.post<Client[]>(`${apiConfig.loyaltyApiUrl}/RecordClient/getAll`, {});
  }

  getClientsByPos(pointOfSellID: string): Observable<Client[]> {
    return this.http.post<Client[]>(`${apiConfig.loyaltyApiUrl}/RecordClient/getByPointOfSale/${pointOfSellID}`, {});
  }
}
