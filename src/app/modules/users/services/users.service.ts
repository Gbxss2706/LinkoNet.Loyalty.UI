import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConfig } from '../../../../enviroment/api-config/api.configuration';
import { Observable } from 'rxjs';
import { User } from '../../../shared-modules/models/user-model';
import { UserInfoRs } from '../../../shared-modules/models/user-info-rs-model';
import { UserInfo } from '../../../shared-modules/models/user-info-model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  
  }

  getAllUsers(): Observable<User[]> {
    return this.http.post<User[]>(`${apiConfig.loyaltyApiUrl}/User/getAll`, {});
  }

  createUser(userInfo: UserInfo): Observable<UserInfoRs>{
    return this.http.post<UserInfoRs>(`${apiConfig.loyaltyApiUrl}/User/create`, userInfo);
  }

  updateUser(userInfo: UserInfo): Observable<UserInfoRs>{
    return this.http.post<UserInfoRs>(`${apiConfig.loyaltyApiUrl}/User/update`, userInfo);
  }

  associateUser( pointOfSaleId : number, userId: number): Observable<any> {
    return this.http.post<any>(`${apiConfig.loyaltyApiUrl}/PointOfSale/associateUser`, {pointOfSaleId, userId});
  }
}
