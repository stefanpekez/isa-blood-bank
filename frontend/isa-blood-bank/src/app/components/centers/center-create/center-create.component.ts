import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/shared/address.model';
import { Center } from '../shared/center.model';
import { CenterService } from '../shared/center.service';

@Component({
  selector: 'app-center-create',
  templateUrl: './center-create.component.html',
  styleUrls: ['./center-create.component.css']
})
export class CenterCreateComponent implements OnInit {
  center: Center = {} as Center;
  fromHours: string = '';
  toHours: string = '';
  addressTB: string = '';

  constructor(private centerService: CenterService) { }

  ngOnInit(): void {
    this.center.address = {} as Address;
  }

  public handleCenter(event: any) {
    event.preventDefault();
    this.center.workingHours = this.fromHours + '-' + this.toHours
    this.center.rating = '0.0';

    this.centerService.create(this.center).subscribe((response: any) => {
      console.log(response);
    });
  }

  public handleAddress(event: any) {
    event.preventDefault();
    this.addressTB = this.center.address.streetName + ', ' + this.center.address.streetNumber + ', ' + this.center.address.town + ', ' + this.center.address.country;
  }

}