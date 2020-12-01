import { Injectable } from '@angular/core';
import { AddressInterface } from '../interfaces/address-interface';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private _addresses: Map<number, AddressInterface> = new Map()

  constructor() {
    this._addresses.set(1, {
      firstName: 'Jean-Luc',
      lastName: 'Aubert',
      phoneNumber: '0523232323',
      email: 'jla.webprojet@gmail.com'
    })
    this._addresses.set(2, {
      firstName: 'Julien',
      lastName: 'Test',
      phoneNumber: '0523232323',
      email: 'julien@julien.fr'
    })
    this._addresses.set(3, {
      firstName: 'Amira',
      lastName: 'Test2',
      phoneNumber: '0521212121',
      email: 'amira@amira.com'
    })
  }

  public get addresses(): Map<number, AddressInterface> {
    return this._addresses
  }

  public add(address: AddressInterface): void {
    this._addresses.set(this._addresses.size + 1, address)
  }
}
