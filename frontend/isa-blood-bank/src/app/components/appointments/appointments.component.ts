import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { AuthService } from '../users/shared/auth.service';
import { User } from '../users/shared/user.model';
import { AppointmentService } from './shared/appointment.service';
import { Appointment } from './shared/appointments.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointment: Appointment = {} as Appointment;
  pickedDate: Date = new Date();
  pickedTime: any;
  centerId: number = -1;

  constructor(private authService: AuthService,
              private appointmentService: AppointmentService,
              private router: Router) { }

  ngOnInit(): void {
    this.centerId = this.authService.getCenterId();
    this.setupAppointment();
  }

  private setupAppointment(){
      this.appointment.isReserved = false;
      this.appointment.duration = 1;
  }

  public selectDate(event: any){
    this.pickedDate = event.target.value;
     /*this.appointment.scheduleTime =this.pickedDate;
     alert(JSON.stringify(this.appointment.scheduleTime));*/
  }

  public defineAppointment(){
    this.appointment.scheduleTime = this.pickedDate
    this.appointment.startTime = this.pickedTime;
    this.appointmentService.create(this.appointment, this.centerId).subscribe((response: any)=>{
      this.router.navigate(['/work-calendar']);
    },(error:Error) =>{ alert('greska');}
    );
    
  }

}
