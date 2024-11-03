import { CanActivateFn, CanMatchFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { inject } from '@angular/core';
import { AuthEnum } from '../core/enums/auth.enum';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export const canActivateAuthGuard: CanActivateFn = (): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const cookieService = inject(CookieService);

  return authService.isAuthenticated().pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        handleNotAuthenticatedSessions(router, cookieService);
      }
    }),
    map(isAuthenticated => isAuthenticated)
  );
};

export const canMatchAuthGuard: CanMatchFn = (): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  return authService.isAuthenticated();
};

export const canActivateAdminRole: CanActivateFn = (): Observable<boolean | UrlTree > => {
  return isAdminRole();
};

function handleNotAuthenticatedSessions(router: Router, cookieService: CookieService): void {
  router.navigate(['/login']);
  cookieService.delete(AuthEnum.JWT_TOKEN);
}

function isAdminRole() : Observable<boolean | UrlTree>{
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAdminRole().pipe(
    map(isAdmin => isAdmin ? true : router.createUrlTree(['/dashboard']))
  );
}