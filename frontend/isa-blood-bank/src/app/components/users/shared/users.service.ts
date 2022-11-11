import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseUrl: string = environment.baseApiUrl + '/users/';
  
  
  constructor(private http: HttpClient) { }

 public getUser(id:number): Observable<User>{
    var headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<User>(`${this.baseUrl}${id}`, {headers: headers});
  }

  public updateUser(user: User): Observable<User>{
    var headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
     return this.http.put<User>(`${this.baseUrl}${user.id}`, JSON.stringify(user), {headers: headers})
  }
}
