import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InterceptorService } from './core/interceptor/interceptor.service';
import { LoaderComponent } from './shared-modules/services/loader/loader.component';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../enviroment/api-config/api.configuration';
import { PopUpComponent } from './shared-modules/components/pop-up/pop-up.component';

initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
