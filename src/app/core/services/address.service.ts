import { Injectable } from '@angular/core';
import { AddressInterface } from '../interfaces/address-interface';

import * as moment from 'moment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private _addresses: Map<number, AddressInterface> = new Map()

  constructor(private httpClient: HttpClient) {}

  public get addresses(): Observable<Map<number, AddressInterface>> {
    return this.httpClient.get<AddressInterface[]>(
      'http://localhost:4200/api/v2/address'
    ).pipe(
      take(1),
      map((result) => {
        result.forEach((address: AddressInterface) => {
          this._addresses.set(address.id, address)
        })
        return this._addresses
      })
    )
  }

  public add(address: AddressInterface): void {
    console.log(`AddressService::add method with ${JSON.stringify(address)}`)
    this.httpClient.post(
      'http://localhost:4200/api/v2/address',
      address
    ).subscribe()
  }

  public find(id: number): AddressInterface | null {
    return this._addresses.get(id)
  }
}
