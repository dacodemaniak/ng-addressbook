import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { AddressInterface } from '../interfaces/address-interface';

@Directive({
  selector: '[appNew]'
})
export class NewDirective implements OnInit {
@Input() private address: AddressInterface
  constructor(
    private element: ElementRef
  ) {
    
  }

  ngOnInit() {
    console.log(`Directive appNew was fired ${this.address.id}`)
    const nativeElement = this.element.nativeElement

    const now: Moment = moment()

    if (now.diff(this.address.creationDate, 'm') < 5) {
      nativeElement.classList.add('new-address')
    }
  }

}
