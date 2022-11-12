import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/shared/address.model';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/shared/data-transfer.service';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-center-admin-create',
  templateUrl: './center-admin-create.component.html',
  styleUrls: ['./center-admin-create.component.css']
})
export class CenterAdminCreateComponent implements OnInit {

  admin: User = {} as User;
  addressTB: string = '';

  constructor(private userService: UsersService, private router: Router, 
    private dataTransferService: DataTransferService) { }

  ngOnInit(): void {
    this.admin.address = {} as Address;
  }

  public handleSubmit(event: Event): void {
    event.preventDefault();
    this.admin.role = 'ADMIN_CENTER';
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
