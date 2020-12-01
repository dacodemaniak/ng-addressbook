import { Injectable } from '@angular/core';
import { AddressInterface } from '../interfaces/address-interface';

import * as moment from 'moment'
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
      email: 'jla.webprojet@gmail.com',
      creationDate: moment('2020-11-30 09:54:00')
    })
    this._addresses.set(2, {
      id: 2,
      firstName: 'Julien',
      lastName: 'Test',
      phoneNumber: '0523232323',
      email: 'julien@julien.fr',
      creationDate: moment('2020-12-01 07:53:00')
    })
    this._addresses.set(3, {
      id: 3,
      firstName: 'Amira',
      lastName: 'Test2',
      phoneNumber: '0521212121',
      email: 'amira@amira.com',
      creationDate: moment('2020-11-30 17:15:00')
    })
  }

  public get addresses(): Map<number, AddressInterface> {
    return this._addresses
  }

  public add(address: AddressInterface): void {
    address.id = this._addresses.size + 1
    address.creationDate = moment()
    this._addresses.set(address.id, address)
  }

  public find(id: number): AddressInterface | null {
    return this._addresses.get(id)
  }
}
