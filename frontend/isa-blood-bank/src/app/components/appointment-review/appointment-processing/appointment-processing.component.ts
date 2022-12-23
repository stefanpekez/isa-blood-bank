import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppointmentReviewDto, Blood } from '../shared/apointment.model';
import { AppointmentService } from '../shared/appointment.service';
import { QuestionnaireService } from '../shared/questionnaire.service';

@Component({
  selector: 'app-appointment-processing',
  templateUrl: './appointment-processing.component.html',
  styleUrls: ['./appointment-processing.component.css']
})
export class AppointmentProcessingComponent implements OnInit {

  appointment: AppointmentReviewDto = {} as AppointmentReviewDto;
  blood: Blood = {} as Blood;
  isEditing: boolean = false;
  isUserValid: boolean = false;

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute, private questionnaireService: QuestionnaireService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.questionnaireService.isUserValidByAppointment(params['id'])
        .subscribe((res: boolean) => {
          this.isUserValid = res;
        })
    });
  }

  public reviewAppointment(status: string) {
    this.route.params.subscribe((params: Params) =>{
      this.appointment.id = params['id'];
    });
    this.appointment.status = status;
    this.appointment.blood = this.blood;
    console.log(this.appointment);
    this.appointmentService.sendReview(this.appointment)
      .subscribe(() => {
        console.log("req sent");
      });
  };

  public changeIsEditing() {
    this.isEditing = !this.isEditing;
  }
}
