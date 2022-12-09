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

  public getCenters(filterMin?: number, filterMax?: number, sortBy?: string, sortOrder?: string, searchName?: string, searchStreet?: string, searchTown?: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    if((!filterMin && !filterMax && !sortBy && !sortOrder) || (filterMin === -1.0 && filterMax === -1.0 && sortOrder === '' && searchName === '' && searchStreet === '' && searchTown === '')) {
      return this.http.get<Center[]>(`${this.baseUrl}`, {headers: headers});
    } 

    const filterParamMin = `filter-min=${filterMin}`;
    const filterParamMax = `filter-max=${filterMax}`;
    const sortByParam = `sort-by=${sortBy}`;
    const sortOrderParam = `sort-order=${sortOrder}`;
    const searchNameParam = `search-name=${searchName}`;
    const searchStreetParam = `search-street=${searchStreet}`;
    const searchTownParam = `search-town=${searchTown}`;

    let url: string;
    if(filterMin !== -1.0 || filterMax !== -1.0 || sortOrder !== ''){
      if(filterMin !== -1.0 && filterMax !== -1.0 && sortOrder !== '') {
        url = `${this.baseUrl}?${filterParamMin}&${filterParamMax}&${sortByParam}&${sortOrderParam}&${searchNameParam}&${searchStreetParam}&${searchTownParam}`;
      } else if (filterMin === -1.0 || filterMax === -1.0) {
        url = `${this.baseUrl}?${sortByParam}&${sortOrderParam}&${searchNameParam}&${searchStreetParam}&${searchTownParam}`;
      } else {
         url = `${this.baseUrl}?${filterParamMin}&${filterParamMax}&${searchNameParam}&${searchStreetParam}&${searchTownParam}`;
      }
    }else{
      url = `${this.baseUrl}?${searchNameParam}&${searchStreetParam}&${searchTownParam}`;
    }
    return this.http.get<Center[]>(url, {headers: headers});
  }
  
}
