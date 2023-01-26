import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../shared/appointment.service';
import { Appointment } from '../shared/appointments.model';

@Component({
  selector: 'app-in-progress-info',
  templateUrl: './in-progress-info.component.html',
  styleUrls: ['./in-progress-info.component.css']
})
export class InProgressInfoComponent implements OnInit {
  id: string = '';
  appointment: Appointment = {} as Appointment;

  constructor(private router: Router, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
  }

  showInfo() {
    if (this.id === '')
      return;

    this.appointmentService.getById(this.id).subscribe((res: Appointment) => {
      const today = new Date();
      const todayString = today.getFullYear() + '-0' + (today.getMonth()+1) + '-' + today.getDate();
      this.appointment = res;
      const appHours = today.getHours() + ':00';
      
      console.log(this.appointment.startTime);
      if (appHours === this.appointment.startTime) {
        console.log('Appointment is ongoing');
        this.router.navigate(['in-progress-edit', this.id]);
      }
    });
  }

}
