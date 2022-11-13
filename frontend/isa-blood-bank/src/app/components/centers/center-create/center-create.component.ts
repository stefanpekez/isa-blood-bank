import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/shared/address.model';
import { User } from '../../users/shared/user.model';
import { UsersService } from '../../users/shared/users.service';
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
  centerAddressTB: string = '';
  adminAddressTB: string = '';
  adminTB: string = '';
  stage: number = 1;
  admin: User = {} as User;
  isRegistering: boolean = false;
  listOfAdmins: User[] = [];
  active: number = -1;

  constructor(private centerService: CenterService, 
      private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.setupUser();
    this.setupCenter();
    this.setupAdmins();
  }

  public handleNext(event: Event) {
    event.preventDefault();
    this.adminTB = this.admin.name + ' ' + this.admin.surname + ', ' + this.admin.upin;
    this.stage += 1;
    
    if (this.stage > 3) {
      console.log(this.admin);
      this.stage = 3;
      this.center.workingHours = this.fromHours + '-' + this.toHours;
      this.admin.role = 'ADMIN_CENTER';
      this.center.admins = [];
      this.center.admins.push(this.admin);
      this.centerService.create(this.center).subscribe((response: any) => {
        this.router.navigate([''])
        }, (error: Error) => {
          alert('Center with this address already exists');
        });
      }

  }

  public handleAddress(event: Event) {
    event.preventDefault();
    if (this.stage === 1) {
      this.centerAddressTB = this.center.address.streetName + ', ' + this.center.address.streetNumber + ', ' + 
                    this.center.address.town + ', ' + this.center.address.country;
    } else {
      this.adminAddressTB = this.admin.address.streetName + ', ' + this.admin.address.streetNumber + ', ' + 
                    this.admin.address.town + ', ' + this.admin.address.country;
    }
    
  }

  private setupUser() {
    this.admin.address = {} as Address;
  }

  private setupCenter() {
    this.center.rating = '0.0';
    this.center.address = {} as Address;
    this.center.admins = [];
  }

  public handleGender(event: Event, gender: string) {
    event.preventDefault();
    this.admin.gender = gender;
  }

  private setupAdmins() {
    this.userService.getAllCenterAdmin().subscribe((response: User[]) => {
      this.listOfAdmins = response;
    });
  }

  public selectItem(index: number) {
    this.active = index;
    this.admin = this.listOfAdmins[this.active];
    this.adminTB = this.admin.name + ' ' + this.admin.surname + ', ' + this.admin.upin;
  }

  public handleAdmin(event: Event) {
    this.admin = this.listOfAdmins[this.active];
    this.handleNext(event);
  }

  public switchRegistering() {
    this.isRegistering = !this.isRegistering;
    this.active = -1;
    this.admin = {} as User;
    this.setupUser();
  }

}