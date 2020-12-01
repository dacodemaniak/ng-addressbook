import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterBarComponent } from './core/components/filter-bar/filter-bar.component';
import { HomeComponent } from './core/pages/home/home.component';
import { AddressDetailComponent } from './core/pages/address-detail/address-detail.component';
import { ElapsedTimePipe } from './core/pipes/elapsed-time.pipe';

import { HttpClientModule } from '@angular/common/http'
@NgModule({
  declarations: [
    AppComponent,
    FilterBarComponent,
    HomeComponent,
    AddressDetailComponent,
    ElapsedTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
