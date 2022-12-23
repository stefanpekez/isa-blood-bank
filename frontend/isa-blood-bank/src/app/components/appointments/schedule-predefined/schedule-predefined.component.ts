import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, of } from 'rxjs';
import { UsersService } from '../../users/shared/users.service';
import { AppointmentService } from '../shared/appointment.service';
import { Appointment, ScheduleAppointment } from '../shared/appointments.model';

@Component({
  selector: 'app-schedule-predefined',
  templateUrl: './schedule-predefined.component.html',
  styleUrls: ['./schedule-predefined.component.css']
})
export class SchedulePredefinedComponent implements OnInit {

  public myAppointments: Appointment[] = [];
  private centerId: number = -1;
  public freeAppointments: Appointment[] = [];
  public scheduleEnabled = false;

  constructor(
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      this.centerId = params['id'];
      this.loadMyAppointments();
    })
  }

  public cancelAppointment(id: number) {
    this.appointmentService.cancelAppointment(id)
    .pipe(catchError(()=> {
      alert('Can not cancel, the appointment is in less than 24hrs');
      return of()
    }))
    .subscribe(() => {
      this.loadMyAppointments();
    })
  }

  private loadMyAppointments() {
    this.appointmentService.getByCenterForUser(this.centerId).subscribe(res => {
      this.myAppointments = res;
    })
  }

  public scheduleEnable() {
    this.scheduleEnabled = !this.scheduleEnabled;
    if(this.scheduleEnabled) {
      this.appointmentService.getAllFree(this.centerId).subscribe(res => {
        this.freeAppointments = res;
      })
    }
  }

  public scheduleAppointment(appointment: number) {
    this.scheduleEnable();
    this.userService.getLoggedInUserEmail()
    .subscribe(res => {
      this.appointmentService.reserve({
        userEmail: res.email,
        appointment: appointment
      } as ScheduleAppointment)
      .pipe(catchError(()=> {
        alert('Patient doesnt have the questionnaire filled or donated blood less than 6 months ago');
        return of()
      }))
      .subscribe(() => this.loadMyAppointments());
    });
  }

  public convertDate(date: any) {
    return `${date[2]}/${date[1]}/${date[0]}`;
  }

  public convertTime(time: any) {
    const hours = time[0] < 10 ? `0${time[0]}`:`${time[0]}`;
    const minutes = time[1] < 10 ? `0${time[1]}`:`${time[1]}`;
    return `${hours}:${minutes}`
  }
}
