import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressInterface } from './../../interfaces/address-interface';
import { AddressService } from './../../services/address.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title: string = 'address-book'
  private _description: string
  
  public isDisplayed: boolean = true
  public addresses: Map<number, AddressInterface>

  public addressForm: FormGroup

  public constructor(
    private addressService: AddressService,
    private formBuilder: FormBuilder
  ) {
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

  public get lastName(): AbstractControl {
    return this.addressForm.controls.lastName
  }
  public get phoneNumber(): AbstractControl {
    return this.addressForm.controls.phoneNumber
  }

  public get email(): AbstractControl {
    return this.addressForm.controls.email
  }

  public onSubmit(): void {
    if (this.addressForm.valid) {
      this.addressService.add(this.addressForm.value)
    }
    this.addressForm.reset()
  }
  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      lastName: [
        '',
        Validators.required
      ],
      firstName: [
        ''
      ],
      phoneNumber: [
        '',
        Validators.required
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ]
    })
  }

}
