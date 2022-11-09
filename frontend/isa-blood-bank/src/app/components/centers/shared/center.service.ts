import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Center } from './center.model';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get('http://localhost:8080/api/center');
  }

  public create(centerCreateDTO: Center) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post('http://localhost:8080/api/center', JSON.stringify(centerCreateDTO), {headers: headers});
  }
}
