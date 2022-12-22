import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment } from './appointments.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  baseUrl: string = environment.baseApiUrl + '/appointments';

  constructor(private http: HttpClient) { }

  public create(appointmentDTO: Appointment, id: number) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/${id}`, JSON.stringify(appointmentDTO), {headers: headers});
  }
}
