import { Component, OnInit } from '@angular/core';
import { User } from '../users/shared/user.model';
import { Appointment } from './shared/appointments.model';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  appointment: Appointment = {} as Appointment;
  pickedDate: Date = new Date();

  constructor() { }

  ngOnInit(): void {
    this.setupAppointment();
  }

  private setupAppointment(){
      this.appointment.assignedStaff = [];
      this.appointment.donator = {} as User;
      this.appointment.isReserved = false;
      this.appointment.duration = 1;
  }

  public helloYou():void{
     this.appointment.scheduleTime =this.pickedDate;
     alert(JSON.stringify(this.appointment.scheduleTime));
  }

}
