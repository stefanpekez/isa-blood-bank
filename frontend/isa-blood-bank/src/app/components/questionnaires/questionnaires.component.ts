import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/shared/users.service';
import { Question, Questionnaire, QuestionnaireCreate, QuestionnaireResponse } from './shared/questionnaire.model';
import { QuestionnaireService } from './shared/questionnaire.service';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.css']
})
export class QuestionnairesComponent implements OnInit {

  public questions: Question[] = [];
  public user = '';
  constructor(
    private questionnaireService: QuestionnaireService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.userService.getLoggedInUserEmail().subscribe(res => {
      this.user = res.email;
      this.loadQuestions();
    });
    
  }

  private loadQuestions(): void {
    this.questionnaireService.getByUser(this.user).subscribe((response: QuestionnaireResponse) => {
      let questions: string[] = [];        
      
      if (response.template) { 
        questions = response.template.data.split(';');
      } else if (response.filledQuestionnaire) {
        questions = response.filledQuestionnaire.answers.split(';');
        this.user = response.filledQuestionnaire.user.email;
      }
      
      questions.forEach((question: string) => {
        const questionSplit = question.split('-');
        const parsedQuestion: Question = {answer: questionSplit[1], question: questionSplit[0]};
        this.questions.push(parsedQuestion);
      });
      this.questions.pop();
    });
  }

  public saveQuestionnaire() {
    const questionnaire: QuestionnaireCreate = {userEmail: this.user, answers: ''};
    
    this.questions.forEach((question: Question) => {
      const line = `${question.question}-${question.answer};`;
      questionnaire.answers = questionnaire.answers.concat(line);
    }); 

    this.questionnaireService.save(questionnaire).subscribe(() => {
      alert('Successfully updated');
    });
  }
}
