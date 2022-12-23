import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  baseUrl: string = environment.baseApiUrl + '/questionnaires';

  constructor(private http: HttpClient) { }

  public isUserValidByAppointment(appointmentId: number) {
    var headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.get<boolean>(`${this.baseUrl}/valid/${appointmentId}`, {headers: headers});
  }
  
}
