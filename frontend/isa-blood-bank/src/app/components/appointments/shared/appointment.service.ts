import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment, ScheduleAppointment } from './appointments.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  baseUrl: string = environment.baseApiUrl + '/appointments';

  constructor(private http: HttpClient) { }

  public create(appointmentDTO: Appointment, id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/${id}`, JSON.stringify(appointmentDTO), {headers: headers});
  }

  public getByCenterForUser(centerId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Appointment[]>(`${this.baseUrl}/filter/${centerId}`, {headers: headers});
  }

  public cancelAppointment(id: number) {
    return this.http.put<Appointment>(`${this.baseUrl}/${id}`, JSON.stringify(id));
  }

  public getAllFree(centerId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Appointment[]>(`${this.baseUrl}/filter-free/${centerId}`);
  }

  public reserve(schedule: ScheduleAppointment) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.put<Appointment>(`${this.baseUrl}`, JSON.stringify(schedule), {headers: headers});
  }
}
