import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterBarComponent } from './core/components/filter-bar/filter-bar.component';
import { HomeComponent } from './core/pages/home/home.component';
import { AddressDetailComponent } from './core/pages/address-detail/address-detail.component';
import { ElapsedTimePipe } from './core/pipes/elapsed-time.pipe';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { UiModule } from './shared/ui/ui.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewDirective } from './core/directives/new.directive';
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
