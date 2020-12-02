import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddressInterface } from './../../interfaces/address-interface';
import { AddressService } from './../../services/address.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public title$: Observable<string>
  private _description: string

  public isDisplayed: boolean = true
  public addresses$: BehaviorSubject<Map<number, AddressInterface>>

  public addressForm: FormGroup

  public isFormVisible = false

  public constructor(
    private addressService: AddressService,
    private formBuilder: FormBuilder,
    private translateService: TranslateService
  ) {
    this._description = 'My Personal Address Book'
    this.addresses$ = addressService.addressesSubject$
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
    this.isFormVisible = true
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
    this.isFormVisible = false
  }

  public doDelete(address: AddressInterface): void {
    this.addressService.delete(address)
  }
  
  ngOnInit(): void {
    // Modifier le sujet en récupérant toutes les adresses
    this.addressService.getAddresses()

    this.title$ = this.translateService.get('home.title')

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
