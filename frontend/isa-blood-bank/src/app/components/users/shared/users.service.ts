import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from '../../donators/shared/userDTO.model';
import { Donator } from './donator.model';
import { ActivationResponse, LoggedInUser, User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = environment.baseApiUrl + '/users';
  baseUrlDonator = environment.baseApiUrl + '/donators/';
  
  
  constructor(private http: HttpClient) { }

 public getUser(id:number): Observable<User>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<User>(`${this.baseUrl}/${id}`, {headers: headers});
  }

  public updateUser(user: User): Observable<User>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
     return this.http.put<User>(`${this.baseUrl}/${user.id}`, JSON.stringify(user), {headers: headers})
  }

  public getDonator(id:number): Observable<Donator>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Donator>(`${this.baseUrlDonator}/${id}`, {headers: headers});
  }

  public create(user: User) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<User>(`${this.baseUrl}`, JSON.stringify(user), {headers: headers});
  }

  public activate(userId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<ActivationResponse>(`${this.baseUrl}/activate/${userId}`, {headers: headers})
  }

  public getAllCenterAdmin() {
    return this.http.get<User[]>(`${this.baseUrl}/role/center`);
  }

  public getAll() {
    return this.http.get<User[]>(`${this.baseUrl}`);
  }

  public findByEmail(email: string) {
    return this.http.get<User>(`${this.baseUrl}/find/${email}`);
  }

  public updatePassword(user: User) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    return this.http.put<User>(`${this.baseUrl}/change`, JSON.stringify(user), {headers: headers}, );
  }

  public getLoggedInUserEmail() {
    return this.http.get<LoggedInUser>(`${this.baseUrl}/findLoggedIn`);
  }

  public getAllDonators(id:number){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<UserDTO[]>(`${this.baseUrl}/donators/center/${id}`, {headers: headers});
  }
}
