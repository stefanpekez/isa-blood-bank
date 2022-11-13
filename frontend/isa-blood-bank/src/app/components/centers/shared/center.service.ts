import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Center } from './center.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CenterService {

  baseUrl: string = environment.baseApiUrl + '/centers';

  constructor(private http: HttpClient) { }

  public getAll() {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Center[]>(`${this.baseUrl}`, {headers: headers});
  }

  public create(centerCreateDTO: Center) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}`, JSON.stringify(centerCreateDTO), {headers: headers});
  }


  public getCenter(id: number):Observable<Center>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Center>(`${this.baseUrl}/${id}`, {headers: headers});
  }

  public updateCenter(center: Center): Observable<Center>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
     return this.http.put<Center>(`${this.baseUrl}/${center.id}`, JSON.stringify(center), {headers: headers})
  }

  public filterByRating(filterBy:number){
    var headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Center[]>(`${this.baseUrl}?filter-by=${filterBy}`, {headers: headers});
  }
  
}
