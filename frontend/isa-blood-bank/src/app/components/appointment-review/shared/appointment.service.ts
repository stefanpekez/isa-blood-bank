import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AppointmentDto } from './apointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  baseUrl: string = environment.baseApiUrl + '/appointment';

  constructor(private http: HttpClient) { }

  public getAll(userId: number) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<AppointmentDto[]>(`${this.baseUrl}/user/${userId}`, {headers: headers});
  }
  
}
