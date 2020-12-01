import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddressDetailComponent } from './core/pages/address-detail/address-detail.component';
import { HomeComponent } from './core/pages/home/home.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'address/:id',
    component: AddressDetailComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
