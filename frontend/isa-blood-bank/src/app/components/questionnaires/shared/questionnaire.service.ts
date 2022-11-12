import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { QuestionnaireCreate } from './questionnaire.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireService {

  private baseUrl = environment.baseApiUrl + '/questionnaires';

  constructor(private http: HttpClient) { }

  public getByUser(userEmail: string)  {
    const response = this.http.get(this.baseUrl + `/${userEmail}`);
    
  }
  
  public save(filledQuestionnaire: QuestionnaireCreate) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.baseUrl, filledQuestionnaire, {headers: headers});
  }

}
