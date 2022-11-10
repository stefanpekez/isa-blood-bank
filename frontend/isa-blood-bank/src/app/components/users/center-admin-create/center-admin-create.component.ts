import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/shared/address.model';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-center-admin-create',
  templateUrl: './center-admin-create.component.html',
  styleUrls: ['./center-admin-create.component.css']
})
export class CenterAdminCreateComponent implements OnInit {

  admin: User = {} as User;
  addressTB: string = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.admin.address = {} as Address;
    this.admin.gender = '-- Select --';
    this.admin.workStatus = '-- Select --';
  }

  public handleSubmit(event: Event) {
    event.preventDefault();
    this.admin.role = 'ADMIN_CENTER';
    this.userService.create(this.admin).subscribe((response: User) => {
      console.log(response);
    });
  }

  public handleAddress(event: Event) {
    event.preventDefault();
    this.addressTB = this.admin.address.streetName + ', ' + this.admin.address.streetNumber + ', ' + 
                    this.admin.address.town + ', ' + this.admin.address.country;
  }

}
