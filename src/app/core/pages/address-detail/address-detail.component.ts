import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressInterface } from '../../interfaces/address-interface';
import { AddressService } from '../../services/address.service';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit {
  public address: AddressInterface

  constructor(
    private routeService: ActivatedRoute,
    private router: Router,
    private addressService: AddressService
  ) { }

  ngOnInit(): void {
    this.address = this.addressService.find(+this.routeService.snapshot.paramMap.get('id'))
  }

  public goHome(): void {
    this.router.navigate(['home'])
  }

}
