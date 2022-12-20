import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/users/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userExists = '';
  public role = '';
  public centerId = -1;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentNav.subscribe(message => {
      const role = this.authService.getRole()
      this.role = role ? role : '';
      this.centerId = this.authService.getCenterId();
      this.userExists = message;
    });
  }

  public logout() {
    this.authService.logout();
  }

}
