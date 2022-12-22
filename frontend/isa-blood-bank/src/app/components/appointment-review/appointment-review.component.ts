import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppointmentDto } from './shared/apointment.model';
import { AppointmentService } from './shared/appointment.service';


@Component({
  selector: 'app-appointment-review',
  templateUrl: './appointment-review.component.html',
  styleUrls: ['./appointment-review.component.css']
})
export class AppointmentReviewComponent implements OnInit {

  appointments: AppointmentDto[] = [];

  constructor(private appointmentService: AppointmentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.appointmentService.getAll(params['id']).subscribe((response: AppointmentDto[]) => {
        this.appointments = response;
      });
    })
  }

}
