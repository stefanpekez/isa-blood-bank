import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from 'src/app/shared/address.model';
import { User } from '../shared/user.model';
import { UsersService } from '../shared/users.service';

@Component({
  selector: 'app-register-regular',
  templateUrl: './register-regular.component.html',
  styleUrls: ['./register-regular.component.css']
})
export class RegisterRegularComponent implements OnInit {

  public user: User = {} as User;
  public addressTB = '';
  public passwordAgain = '';

  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.user.address = {} as Address;
  }

  public create(event: Event): void {
    event.preventDefault();

    if(this.passwordAgain !== this.user.password) {
      alert('Passwords are not the same');
      return;
    }

    this.user.role = "REGULAR";
    this.userService.create(this.user).subscribe(() => {
      this.router.navigate(['users']);
    });
  }

  public handleAddress(event: Event): void {
    event.preventDefault();
    this.addressTB = `${this.user.address.streetName},${this.user.address.streetNumber},${this.user.address.town},${this.user.address.country}`;
  } 

  public handleGender(event: Event, gender: string): void {
    event.preventDefault();
    this.user.gender = gender;
  }

  public handleWorkStatus(event: Event, status: string): void {
    event.preventDefault();
    this.user.workStatus = status;
  }

}
