import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/shared/address.model';
import { DataTransferService } from 'src/app/shared/data-transfer.service';
import { User } from '../shared/user.model';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-system-admin-create',
  templateUrl: './system-admin-create.component.html',
  styleUrls: ['./system-admin-create.component.css']
})
export class SystemAdminCreateComponent implements OnInit {

  admin: User = {} as User;
  addressTB: string = '';

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.admin.address = {} as Address;
  }

  public handleSubmit(event: Event): void {
    event.preventDefault();
    this.admin.role = 'ADMIN_SYSTEM';
    this.userService.create(this.admin).subscribe((response: User) => {
      console.log(response);
      this.router.navigate(['users']);
    });
  }

  public handleAddress(event: Event): void {
    event.preventDefault();
    this.addressTB = this.admin.address.streetName + ', ' + this.admin.address.streetNumber + ', ' + 
                    this.admin.address.town + ', ' + this.admin.address.country;
  }

  public handleGender(event: Event, gender: string): void {
    event.preventDefault();
    this.admin.gender = gender;
  }

}
