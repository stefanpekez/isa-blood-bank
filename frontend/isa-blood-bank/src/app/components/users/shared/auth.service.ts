import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginCredentials, UserTokenState } from './auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseApiUrl + '/auth/';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public login(credentials: LoginCredentials): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    this.http.post<UserTokenState>(`${this.baseUrl}/login`, JSON.stringify(credentials), {headers: headers}).subscribe((res: UserTokenState) => {
      console.log(res);
      localStorage.setItem("jwt", res.accessToken);
      this.router.navigate(['/']);
    });
  }
}
