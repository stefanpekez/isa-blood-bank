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

  public getCenters(filterBy?: number, sortBy?: string, sortOrder?: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    if((!filterBy && !sortBy && !sortOrder) || (filterBy === -1.0 && sortOrder === '')) {
      return this.http.get<Center[]>(`${this.baseUrl}`, {headers: headers});
    } 

    const filterParam = `filter-by=${filterBy}`;
    const sortByParam = `sort-by=${sortBy}`;
    const sortOrderParam = `sort-order=${sortOrder}`;

    let url: string;
    if(filterBy !== -1.0 && sortOrder !== '') {
      url = `${this.baseUrl}?${filterParam}&${sortByParam}&${sortOrderParam}`;
    } else if (filterBy === -1.0) {
      url = `${this.baseUrl}?${sortByParam}&${sortOrderParam}`;
    } else {
      url = `${this.baseUrl}?${filterParam}`;
    }

    return this.http.get<Center[]>(url, {headers: headers});
  }
  
}
