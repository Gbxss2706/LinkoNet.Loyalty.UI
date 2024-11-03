import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, delay, finalize, throwError } from 'rxjs';
import { AuthEnum } from '../enums/auth.enum';
import { LoaderService } from '../../shared-modules/services/loader-service/loader-service';
import { ErrorService } from '../../shared-modules/services/error-service/error-service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor(private cookieService: CookieService, private loaderService: LoaderService, private errorService: ErrorService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    const token = this.cookieService.get(AuthEnum.JWT_TOKEN);
    const modifiedRequest = request.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',  
          },
      
    });
    return next.handle(modifiedRequest).pipe(
      delay(0),
      catchError((error: HttpErrorResponse) => {
        if(error.status){
          this.errorService.triggerHasError();
        }
        else{
          this.errorService.triggerHasNoError();
        }
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hide())
    );
  }
}
