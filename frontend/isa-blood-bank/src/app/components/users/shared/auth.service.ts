import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, of, throwIfEmpty } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginCredentials, UserTokenState } from './auth.model';
import { User } from './user.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseApiUrl + '/auth/';
  private accessToken = localStorage.getItem('jwt');
  private currentRole = localStorage.getItem('role');
  private currentCenterId = Number(localStorage.getItem('centerId'));
  private authenticated = localStorage.getItem('role') ? true : false;
  private nav = new BehaviorSubject<string>(localStorage.getItem('jwt')? 'true': 'false');
  private user: User = {} as User;
  public currentNav = this.nav.asObservable();
  private currentUserId = Number(localStorage.getItem('id'));

  constructor(
    private router: Router,
    private http: HttpClient,
    private userService: UsersService
  ) { }

  public handleLogin(credentials: LoginCredentials) {
    this.login(credentials)
    .pipe(catchError(()=> {
      alert('Account not activated');
      return of()
    }))
    .subscribe((res: UserTokenState) => {
      localStorage.setItem('jwt', res.accessToken);
      this.accessToken = res.accessToken;

      localStorage.setItem('role', res.role);
      this.currentRole = res.role;

      this.authenticated = this.currentRole ? true : false;
    
      localStorage.setItem('centerId', res.centerId ? res.centerId.toString() : '-1');
      this.currentCenterId = Number(res.centerId);

      localStorage.setItem('id', res.id ? res.id.toString() : '-1');
      this.currentUserId = Number(res.id);

      this.nav.next('true');

      let decodedJWT;
      if (this.accessToken != null) {
        decodedJWT = JSON.parse(window.atob(this.accessToken.split('.')[1]));
      }

      this.userService.findByEmail(decodedJWT.sub).subscribe((response: User) => {
        this.user = response;
        console.log(this.user);
        if (this.user.role === 'ADMIN_SYSTEM' && this.user.lastPasswordResetDate == null) {
          this.router.navigate(['/pass-change']);
        } else {
          this.router.navigate(['/']);
        }
      });

      

      // this.router.navigate(['/']);
      return res;
    });
  }

  private login(credentials: LoginCredentials) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.post<UserTokenState>(`${this.baseUrl}login`, JSON.stringify(credentials), { headers: headers })
  }

  public logout():void {
    this.accessToken = null;
    localStorage.removeItem('jwt');
    localStorage.removeItem('role');
    this.nav.next('false');
    this.router.navigate(['/users/login']);
  }

  public getToken() {
    return this.accessToken;
  }

  public getRole() {
    return this.currentRole;
  }

  public getCenterId() {
    return this.currentCenterId;
  }

  public getUserId() {
    return this.currentUserId;
  }

  public isAuthenticated() {
    console.log(this.authenticated);
    return this.authenticated;
  }
}
