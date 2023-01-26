import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { UsersService } from '../../users/shared/users.service';
import { AppointmentService } from '../shared/appointment.service';
import { Appointment } from '../shared/appointments.model';

@Component({
  selector: 'app-appointment-history',
  templateUrl: './appointment-history.component.html',
  styleUrls: ['./appointment-history.component.css']
})
export class AppointmentHistoryComponent implements OnInit {

  public myAppointments: Appointment[] = [];
  public centerId: number | undefined;

  sortBy = '';
  sortOrder = 0;
  orderValues = ['', 'asc', 'desc']


  constructor(
    private appointmentService: AppointmentService,
    private userService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=> {
      this.centerId = params['id'];
      this.loadAppointments();
    });  
  }

  private loadAppointments() {
    this.userService.getLoggedInUserEmail().subscribe(response => {
        this.appointmentService.getAppointmentHistory(this.centerId ? this.centerId : -1, response.email, this.orderValues[this.sortOrder], this.sortBy)
          .subscribe(appointments => this.myAppointments = appointments); 
    });
  }

  public handleSort(event: Event, value: string) {
    event.preventDefault();
    if(this.sortBy !== value) {
      this.sortOrder = 1;
      this.sortBy = value;
    } else {
      this.sortOrder = (this.sortOrder + 1) % 3;
    }
    this.loadAppointments();
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
