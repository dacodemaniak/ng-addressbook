import { Injectable } from '@angular/core';
import { AddressInterface } from '../interfaces/address-interface';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private _addresses: Map<number, AddressInterface> = new Map()

  constructor() {
    this._addresses.set(1, {
      id: 1,
      firstName: 'Jean-Luc',
      lastName: 'Aubert',
      phoneNumber: '0523232323',
      email: 'jla.webprojet@gmail.com'
    })
    this._addresses.set(2, {
      id: 2,
      firstName: 'Julien',
      lastName: 'Test',
      phoneNumber: '0523232323',
      email: 'julien@julien.fr'
    })
    this._addresses.set(3, {
      id: 3,
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
    address.id = this._addresses.size + 1
    this._addresses.set(address.id, address)
  }

  public find(id: number): AddressInterface | null {
    return this._addresses.get(id)
  }
}
