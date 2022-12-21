import { Component, OnInit } from '@angular/core';
import { LoginCredentials, UserTokenState } from '../shared/auth.model';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public credentials: LoginCredentials = <LoginCredentials>{};

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  public login(): void {
    this.authService.handleLogin(this.credentials);
  }

}
