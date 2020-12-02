import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterBarComponent } from './core/components/filter-bar/filter-bar.component';
import { HomeComponent } from './core/pages/home/home.component';
import { AddressDetailComponent } from './core/pages/address-detail/address-detail.component';
import { ElapsedTimePipe } from './core/pipes/elapsed-time.pipe';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiModule } from './shared/ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewDirective } from './core/directives/new.directive';
import { fakeBackendProvider } from './core/helpers/fake-backend-interceptor';
import { TranslationService } from './core/services/translation.service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Set a function that invoke init method from translationService
export function translationInitializerFactory(
  translationService: TranslationService,
  translateService: TranslateService,
  injector: Injector
){
  return (): Promise<void> => {
    return translationService.init(translateService, injector)
  }
}

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(
    httpClient,
    './assets/i18n/',
    '.json'
  )
}

@NgModule({
  declarations: [
    AppComponent,
    FilterBarComponent,
    HomeComponent,
    AddressDetailComponent,
    ElapsedTimePipe,
    NewDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UiModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [
          HttpClient
        ]
      }
    })
  ],
  providers: [
    fakeBackendProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: translationInitializerFactory,
      deps: [
        TranslationService,
        TranslateService,
        Injector
      ],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
