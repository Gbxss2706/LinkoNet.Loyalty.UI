import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, take, tap } from 'rxjs';
import { apiConfig } from '../../../enviroment/api-config/api.configuration';
import { JwtAuth } from '../model/jwt-auth.model';
import { CookieService } from 'ngx-cookie-service';
import { RolEnum } from '../../shared-modules/enums/rol.enum';
import { AuthEnum } from '../enums/auth.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = new BehaviorSubject<JwtAuth | null> (null); 
  public $user = this.user.asObservable();

  constructor(private http: HttpClient,
    private cookieService: CookieService) { }

  loginUser(email: string, password: string): Observable<JwtAuth> {
    const loginData = { email, password };
    return this.http.post<JwtAuth>(`${apiConfig.loyaltyApiUrl}/User/login`, loginData).pipe(
      tap((userData : JwtAuth) => this.user.next(userData))
    )
  }

  hasRole(allowedRoles: string[]): boolean {
    const userRoles: RolEnum[] = [RolEnum.ADMIN_ROL, RolEnum.USER_ROL];
    return allowedRoles.some(role => userRoles.includes(role as RolEnum));
  }

  isAuthenticated(): Observable<boolean> {
    return of(this.cookieService.check(AuthEnum.JWT_TOKEN));
  }

  logout(): void {
    this.cookieService.delete(AuthEnum.JWT_TOKEN);
  }

  isAdminRole(): Observable<boolean> {
    const isAdminRole = this.cookieService.get("jwtRol") === RolEnum.ADMIN_ROL.toString();
    return this.$user.pipe(
      take(1),
      map((userData: JwtAuth | null) => userData?.scope === RolEnum.ADMIN_ROL.toString() || isAdminRole)
    );
  }
}