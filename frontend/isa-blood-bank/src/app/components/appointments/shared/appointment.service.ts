import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment, CenterAppointment, ScheduleAppointment } from './appointments.model';
import { Center } from '../../centers/shared/center.model';
import { Report } from './report.model';

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

  public findCentersByAvailableAppointment(appointmentDTO: Appointment) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<CenterAppointment[]>(`${this.baseUrl}/find-available`, JSON.stringify(appointmentDTO), {headers: headers});
  }

  public sortAvailableCentersByScore(appointmentDTO: Appointment, sortOrder: string, sortBy: string) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Center[]>(`${this.baseUrl}/sort-available?sort-order=${sortOrder}&sort-by=${sortBy}`, JSON.stringify(appointmentDTO), {headers: headers});
  }

  public getAppointmentHistory(centerId: number, username: string, sortOrder: string, sortType: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Appointment[]>(`${this.baseUrl}/user-history?username=${username}&center-id=${centerId}&sort-order=${sortOrder}&sort-type=${sortType}`, {headers: headers})
  }
  public saveReport(report: Report) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Report>(`${this.baseUrl}/save-report`, JSON.stringify(report), {headers: headers});
  }

  public getById(id: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<Appointment>(`${this.baseUrl}/get/${id}`);
  }
}
