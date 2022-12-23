import { Component, OnInit } from '@angular/core';
import { convertToParamMap, Router } from '@angular/router';
import { Center } from '../../centers/shared/center.model';
import { CenterService } from '../../centers/shared/center.service';
import { AppointmentService } from '../shared/appointment.service';
import { Appointment, CenterAppointment, ScheduleAppointment } from '../shared/appointments.model';

import { UsersService } from '../../users/shared/users.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-define-regular',
  templateUrl: './define-regular.component.html',
  styleUrls: ['./define-regular.component.css']
})
export class DefineRegularComponent implements OnInit {

  pickedDate: Date = new Date();
  pickedTime: any;
  centers: Center[] = [];
  sortBy = '';
  sortOrder = 0;
  orderValues = ['', 'asc', 'desc']
  appointment:Appointment = {} as Appointment;
  private centerAppointments: CenterAppointment[] = [];

  constructor(
    private centerService: CenterService,
    private router: Router,
    private appointmentService: AppointmentService,
    private userService: UsersService    
  ) { }

  ngOnInit(): void {
  }

  public selectDate(event: any){
    this.pickedDate = event.target.value;
  }

  public searchAppointment(){
    this.appointment.scheduledTime = this.pickedDate;
    this.appointment.startTime = this.pickedTime;
    this.appointment.isReserved = false;
    this.appointment.duration = 1;
    this.loadCenters();
  }

  public loadCenters() {
    this.appointmentService.findCentersByAvailableAppointment(this.appointment).subscribe((response: CenterAppointment[])=>{
      console.log(response)
      response.forEach(dto => this.centers.push(dto.center));
      this.centerAppointments = response;
    })
  }

  public sortCenters(){
    this.appointmentService.sortAvailableCentersByScore(this.appointment, this.orderValues[this.sortOrder], this.sortBy).subscribe((response: Center[])=>{
      this.centers = response;
    })
  }

  public handleSort(event: Event, value: string) {
    event.preventDefault();
    if(this.sortBy !== value) {
      this.sortOrder = 1;
      this.sortBy = value;
    } else {
      this.sortOrder = (this.sortOrder + 1) % 3;
    }
    if(this.sortBy !== '')
      this.sortCenters();
  } 

  public procedeSchedule(center: number){
    this.userService.getLoggedInUserEmail()
    .subscribe(response => {
      console.log(response);
      const userEmail = response.email;
      console.log(this.centerAppointments);
      console.log(center);
      const appointment = this.centerAppointments
                            .find(centerAppointment => centerAppointment.center.id === center);
      
      console.log(appointment)

      if(appointment) {
        const schedule = <ScheduleAppointment> {
          userEmail: userEmail,
          appointment: appointment.appointment.id
        }


        this.appointmentService.reserve(schedule)
        .pipe(catchError(()=> {
          alert('Questionnaire was not filled or user donated blood in the past 6 months');
          setTimeout(() =>{
            this.router.navigate(['questionnaires']);
          },2000);
          return of()
        }))
        .subscribe(() => {
          alert('Successfully scheduled appointment');
        })
      }
    });
  
  }

  

}
