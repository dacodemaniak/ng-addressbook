import { Component } from '@angular/core';
import { AddressInterface } from './core/interfaces/address-interface';
import { AddressService } from './core/services/address.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'address-book'
  private _description: string
  
  public isDisplayed: boolean = true
  public addresses: Map<number, AddressInterface>

  public constructor(private addressService: AddressService) {
    this._description = 'My Personal Address Book'
    this.addresses = addressService.addresses
  }

  /**
   * 
   * @return string
   */
  public get description(): string {
    return this._description
  }

  public titleAsUpper(): string {
    return this.title.toUpperCase()
  }

  public getTitle(): string {
    return this.title
  }

  public toggleDisplay(event: boolean): void {
    console.log(`Hey, i'm receiving ${event ? 'display all' : 'hide all'}`)
    this.isDisplayed = event
  }

  public addAddress(): void {

    this.addressService.add(
      {
        lastName: 'Casper',
        firstName: 'Le Fantome',
        phoneNumber: '0120202020',
        email: 'casper@ghost.com'
      }
    )
  }
}
