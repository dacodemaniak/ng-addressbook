import { Injectable } from '@angular/core';
import { AddressInterface } from '../interfaces/address-interface';

import * as moment from 'moment'
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private _addresses: Map<number, AddressInterface> = new Map()
public addressesSubject$: BehaviorSubject<Map<number, AddressInterface>> = new BehaviorSubject(new Map())
  
constructor(private httpClient: HttpClient) {}

  public getAddresses(): void {
    this.httpClient.get<AddressInterface[]>(
      'http://localhost:4200/api/v2/address'
    ).pipe(
      take(1),
      map((result) => {
        result.forEach((address: AddressInterface) => {
          this._addresses.set(address.id, address)
        })
        this.addressesSubject$.next(this._addresses)
      })
    ).subscribe()
  }

  public add(address: AddressInterface): void {
    console.log(`AddressService::add method with ${JSON.stringify(address)}`)
    this.httpClient.post(
      'http://localhost:4200/api/v2/address',
      address
    ).subscribe((address: AddressInterface) => {
      const addresses: Map<number, AddressInterface> = this.addressesSubject$.getValue()
      addresses.set(address.id, address)
      this.addressesSubject$.next(addresses)
    })
  }

  public delete(address: AddressInterface): void {
    this.httpClient.delete(
      'http://localhost:4200/api/v2/address/' + address.id
    ).subscribe((message: any) => {
      console.log(`Message was : ${JSON.stringify(message)}`)
      const addresses: Map<number, AddressInterface> = this.addressesSubject$.getValue()
      addresses.delete(address.id)
      this.addressesSubject$.next(addresses)      
    })
  }
  public find(id: number): AddressInterface | null {
    return this.addressesSubject$.getValue().get(id)
  }
}
