import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
  pickedTime: string = '';
  centerId: number = -1;

  constructor(private authService: AuthService,
              private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.centerId = this.authService.getCenterId();
    this.setupAppointment();
  }

  private setupAppointment(){
      //this.appointment.assignedStaff = [];
      //this.appointment.donator = {} as User;
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
    alert(this.pickedTime);
    /*this.appointmentService.create(this.appointment, this.centerId).subscribe((response: any)=>{
    },(error:Error) =>{ alert('greska');}
    );*/
    
  }

}
