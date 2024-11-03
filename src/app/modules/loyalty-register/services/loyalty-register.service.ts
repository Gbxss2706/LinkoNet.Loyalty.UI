import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { recordClientRS } from '../models/record-client-RS.model';
import { apiConfig } from '../../../../enviroment/api-config/api.configuration';
import { RecordClient } from '../models/record-client.model';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyRegisterService {
  
  constructor(private http: HttpClient) { }

  public createRecordClient(recordClient: RecordClient): Observable<recordClientRS> {
    return this.http.post<recordClientRS>(`${apiConfig.loyaltyApiUrl}/RecordClient/create`, recordClient);
  }
}
