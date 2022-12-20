import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, throwIfEmpty } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginCredentials, UserTokenState } from './auth.model';

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
  public currentNav = this.nav.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public login(credentials: LoginCredentials): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    this.http.post<UserTokenState>(`${this.baseUrl}login`, JSON.stringify(credentials), { headers: headers }).subscribe((res: UserTokenState) => {
      localStorage.setItem('jwt', res.accessToken);
      this.accessToken = res.accessToken;

      localStorage.setItem('role', res.role);
      this.currentRole = res.role;

      this.authenticated = this.currentRole ? true : false;
    
      localStorage.setItem('centerId', res.centerId ? res.centerId.toString() : '-1');
      this.currentCenterId = Number(res.centerId);

      this.nav.next('true');
      this.router.navigate(['/']);
    });
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

  public isAuthenticated() {
    console.log(this.authenticated);
    return this.authenticated;
  }
}
