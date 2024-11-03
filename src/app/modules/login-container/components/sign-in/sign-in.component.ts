import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/auth/auth.service';
import { JwtAuth } from '../../../../core/model/jwt-auth.model';
import { CookieService } from 'ngx-cookie-service';
import { AuthEnum } from '../../../../core/enums/auth.enum';


@Component({
  selector: 'app-sign-in',
  templateUrl: './templates/sign-in.component.html',
  styleUrl: './styles/sign-in.component.scss',
})
export class SignInComponent {
  loginForm: FormGroup;
  public touchedOrDirtyFields: Set<string> = new Set<string>();

  inputType = 'password';
  visible = false;
  public readonly lableValidClassValue: string = "text-green-700 dark:text-green-500";
  public readonly lableInvalidClassValue: string = "text-red-700 dark:text-red-500";
  public readonly inputValidClassValue: string = "border-green-500 text-green-900 dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 focus:ring-green-500 focus:border-green-500 block dark:bg-gray-700 dark:border-green-500";
  public readonly inputInvalidClassValue: string = "bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block dark:text-red-500 dark:placeholder-red-500 dark:border-red-500";
  public readonly paragraphValidClassValue: string = "mt-2 text-sm text-green-600 dark:text-green-500";
  public readonly paragraphInvalidClassValue: string = "mt-2 text-sm text-red-600 dark:text-red-500";

  constructor(private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private authService: AuthService,
    private cookieService: CookieService
  ) {
    this.loginForm = this.fb.group({
      email: ['', {
        validators: [Validators.required, Validators.email]
      }],
      password: ['', Validators.required]
    });
  }

  public sendLoginForm(): void {
    const hasErrors = this.loginForm.invalid;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    if (hasErrors) {
      this.router.navigate(['/']);
      this.snackbar.open('Something is wrong about credentials!', 'Accept', {
        duration: 10000
      });
    } else {
      this.loginUser(email, password);
    }
  }

  public toggleVisibility(): void {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }

  private loginUser(email: string, password: string): void {
    this.authService.loginUser(email, password).subscribe(
      (response: JwtAuth) => {
        this.handleLoginResponse(response);
      },
      error => {
        console.error('Error en el inicio de sesión', error);
      }
    )
  }

  private handleLoginResponse(response: JwtAuth): void {
    this.cookieService.set(AuthEnum.JWT_TOKEN, response.access_token, response.expires_in, '/', this.isLocalEnviroment() ? 'localhost' : window.location.host, true);
    this.cookieService.set(AuthEnum.JWT_ROL, response.scope, response.expires_in, '/', this.isLocalEnviroment() ? 'localhost' : window.location.host, true);
    sessionStorage.setItem("userPointOfSale", response.pointOfSales.toString());
    this.router.navigate(['/dashboard']);
  }

  private isLocalEnviroment(): boolean{
    return !!window.location.host.includes("localhost")
  }

  protected isTouchedOrDirtyField(posField: string): boolean {
    return this.loginForm.get(posField)?.dirty || this.touchedOrDirtyFields.has(posField);
  }

  protected markFieldAsTouchedOrDirty(posField: string): void {
    this.touchedOrDirtyFields.add(posField);
  }

  protected isFieldValid(posField: string): boolean {
    return this.isTouchedOrDirtyField(posField) && this.loginForm.get(posField)!.invalid;
  }
}
