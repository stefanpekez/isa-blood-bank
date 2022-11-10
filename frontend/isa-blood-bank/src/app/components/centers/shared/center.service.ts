import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Center } from './center.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  baseUrl: string = environment.baseApiUrl + '/centers';

  constructor(private http: HttpClient) { }

  public getAll() {
    return this.http.get(`${this.baseUrl}`);
  }

  public create(centerCreateDTO: Center) {
    console.log(this.baseUrl);
    var headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}`, JSON.stringify(centerCreateDTO), {headers: headers});
  }
}
