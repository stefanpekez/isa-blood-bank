import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Donator } from './donator.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = environment.baseApiUrl + '/users/';
  baseUrlDonator = environment.baseApiUrl + '/donators/'
  
  
  constructor(private http: HttpClient) { }

 public getUser(id:number): Observable<User>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<User>(`${this.baseUrl}${id}`, {headers: headers});
  }

  public updateUser(user: User): Observable<User>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
     return this.http.put<User>(`${this.baseUrl}${user.id}`, JSON.stringify(user), {headers: headers})
  }

  public getDonator(id:number): Observable<Donator>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Donator>(`${this.baseUrlDonator}${id}`, {headers: headers});
  }
}
