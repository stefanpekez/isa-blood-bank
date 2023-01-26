import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/users/shared/auth.service';
import { UsersService } from 'src/app/components/users/shared/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userExists = '';
  public role = '';
  public centerId = -1;
  public id = -1;
  public user = '';

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.authService.currentNav.subscribe(message => {
      const role = this.authService.getRole()
      this.role = role ? role : '';
      this.centerId = this.authService.getCenterId();
      this.userExists = message;
      this.id = this.authService.getUserId();
    });

    this.userService.getLoggedInUserEmail().subscribe(user => {
      this.userService.findByEmail(user.email).subscribe(response => {
        this.user = response.name;
      });
    });

  }

  public logout() {
    this.authService.logout();
  }

}
