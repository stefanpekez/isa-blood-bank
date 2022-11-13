import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Questionnaire, QuestionnaireCreate, QuestionnaireResponse } from './questionnaire.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private baseUrl = environment.baseApiUrl + '/questionnaires';

  constructor(private http: HttpClient) { }

  public getByUser(userEmail: string): Observable<QuestionnaireResponse> {
    return this.http.get<QuestionnaireResponse>(`${this.baseUrl}/${userEmail}`);
  }
  
  public save(filledQuestionnaire: QuestionnaireCreate): Observable<Questionnaire> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<Questionnaire>(this.baseUrl, filledQuestionnaire, {headers: headers});
  }

}
