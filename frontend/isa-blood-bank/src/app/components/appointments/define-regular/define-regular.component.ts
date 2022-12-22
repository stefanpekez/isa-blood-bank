import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Center } from '../../centers/shared/center.model';
import { CenterService } from '../../centers/shared/center.service';
import { AppointmentService } from '../shared/appointment.service';
import { Appointment } from '../shared/appointments.model';

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

  constructor(private centerService: CenterService,
              private router: Router,
              private appointmentService: AppointmentService) { }

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
    this.appointmentService.findCentersByAvailableAppointment(this.appointment).subscribe((response: Center[])=>{
      this.centers = response;
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

  public procedeSchedule(){
    this.router.navigate(['questionnaires']);
  }

  

}
