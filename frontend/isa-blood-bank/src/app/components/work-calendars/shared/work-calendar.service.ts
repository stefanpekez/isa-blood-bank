import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Appointment } from './appointment';
import { WorkCalendar } from './work-calendar';

@Injectable({
  providedIn: 'root'
})
export class WorkCalendarService {

  private baseUrl: string = environment.baseApiUrl + '/calendars'

  constructor(private http: HttpClient) { }

  public getById(centerId: number) {
    return this.http.get<WorkCalendar>(`${this.baseUrl}/${centerId}`);
  }

  public getAllAppointments(workCalendarId: number) {
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments/${workCalendarId}`);
  }
}
