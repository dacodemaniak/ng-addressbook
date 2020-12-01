import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterBarComponent } from './core/components/filter-bar/filter-bar.component';
import { HomeComponent } from './core/pages/home/home.component';
import { AddressDetailComponent } from './core/pages/address-detail/address-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterBarComponent,
    HomeComponent,
    AddressDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
