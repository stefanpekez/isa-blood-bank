import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from './shared/appointment';
import { DaySlot } from './shared/day-slot';
import { MonthSlot } from './shared/month-slot';
import { WorkCalendar } from './shared/work-calendar';
import { WorkCalendarService } from './shared/work-calendar.service';

@Component({
  selector: 'app-work-calendars',
  templateUrl: './work-calendars.component.html',
  styleUrls: ['./work-calendars.component.css']
})
export class WorkCalendarsComponent implements OnInit {
  month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  currentMonth: string = '';
  currentWeek: string = '';
  currentDate: Date = {} as Date;
  currentDateWeek: Date = {} as Date;
  dayAmount: number = -1;
  previousAmount: number = -1;
  view: string = 'Month';
  hours: string[] = [];
  selectedTimeSlot: number = -1;
  daySlots: DaySlot[] = [];
  monthSlots: MonthSlot[] = [];
  appointments: Appointment[] = [];
  centerId: number = -1;
  workCalendar: WorkCalendar = {} as WorkCalendar;
  selectedSlot: MonthSlot = {} as MonthSlot;
  freeAppointments: number = 0;
  reservedAppointments: number = 0;

  constructor(private router: Router, private _activatedRoute: ActivatedRoute, private workCalendarService: WorkCalendarService) { }

  ngOnInit(): void {
    const param = this._activatedRoute.snapshot.paramMap.get("id");
    if (param !== null) {
      this.centerId = +param;
    }

    this.workCalendarService.getById(this.centerId).subscribe((response: WorkCalendar) => {
      this.workCalendar = response;
      this.workCalendarService.getAllAppointments(this.workCalendar.id).subscribe((res: Appointment[]) => {
        console.log(res);
        this.appointments = res;
        this.appointments.forEach(element => {
          const periods: string[] = element.scheduledTime.split('-');
          element.scheduledTime = this.month[+periods[1]-1] + ' ' + periods[2] + ', ' + periods[0];
          element.startTime = this.findHours(element.startTime);
        });
        console.log(this.appointments);
        for (let i = 0; i < 24; ++i) {
          if (i === 23) {
            this.hours.push(i + ':00-' + '00:00');
            continue;
          }
          this.hours.push(i + ':00-' + (i+1) + ':00');
        }
    
        this.currentDateWeek = new Date();
        this.loadWeek();
    
        this.currentDate = new Date();
        this.getCurrentWeek(0);
        this.changeMonth(0);
      });
    });
  }

  findHours(hour: string): string {
    let hourNum = 0;
    let hourTuned = '';
    if (hour[0] === '0') {
      hour = hour.substring(1);
      hourNum = +hour[0]+1;
      if (hourNum < 10) {
        hourTuned = hourNum + ":00"
      } else {
        hourTuned = hourNum + ":00"
      }
      hour = hour + '-' + hourTuned;
    } else {
      hourNum = +hour.substring(0, 2)+1;
      if (hourNum === 24) {
        hourNum = 0;
        hourTuned = '0' + hourNum + ':00'
        hour = hour + '-' + hourTuned;
      } else {
        hour = hour + '-' + hourNum + ':00'
      }
    }
    // console.log(hour);
    return hour;
  }

  loadWeek() {
    this.daySlots = [];
    for(let i = 0; i < 7; ++i) {
      for (let j = 0; j < 24; ++j) {
        this.daySlots.push(new DaySlot(this.calculateDate(i), this.hours[j]));
      }
    }
  }

  loadAppointments() {
    if (this.view === 'Month') {
      for (let i = 0; i < this.appointments.length; ++i) {
        for (let j = 0; j < this.monthSlots.length; ++j) {
          let trimmed: string = this.appointments[i].scheduledTime;
          // if (+this.monthSlots[j].date.split(' ')[1].replace(',', '') < 10) {
          //   trimmed = '0' + this.monthSlots[j].date.split(' ')[1].replace(',', '');
          // } else {
          //   trimmed = this.monthSlots[j].date.split(' ')[1].replace(',', '');
          // }
          // trimmed = this.appointments[i].scheduleTime.split(' ')[0] + ' ' + 
          //   this.appointments[i].scheduleTime.split(' ')[1].replace(',', '') + ', ' + 
          //   this.appointments[i].scheduleTime.split(' ')[2];
          // console.log('appointment date: ' + trimmed);
          // console.log('monthslot date: ' + this.monthSlots[j].date);
          if (this.monthSlots[j].date === this.appointments[i].scheduledTime) {

            this.monthSlots[j].addAppointment(this.appointments[i]);
          }
        }
      }
    } else {
      for (let i = 0; i < this.appointments.length; ++i) {
        for (let j = 0; j < this.daySlots.length; ++j) {
          if (this.appointments[i].scheduledTime === this.daySlots[j].date
              && this.appointments[i].startTime === this.daySlots[j].time) {
                console.log('appointment date: ' + this.appointments[i].scheduledTime);
                console.log('dayslot date: ' + this.daySlots[j].date);

                console.log('appointment time: ' + this.appointments[i].startTime);
                console.log('dayslot time: ' + this.daySlots[j].time);
                this.daySlots[j].appointment = this.appointments[i];
          }
        }
      }
    }
    for(let i = 0; i < this.monthSlots.length; ++i) {
      for (let j = 0; j < this.monthSlots[i].appointments.length; ++j) {
        if (this.monthSlots[i].appointments[j].reserved === true) {
          this.monthSlots[i].reservedAppointments += 1;
        } else {
          this.monthSlots[i].freeAppointments += 1;
        }
      }
    }
  }

  calculateDate(byDays: number): string {
    const today = this.currentDateWeek;
    today.setDate(today.getDate() + byDays);

    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));

    let currentDay = new Date();
    currentDay.setDate(firstDay.getDate() + byDays);
    currentDay.setMonth(today.getMonth());
    currentDay.setFullYear(today.getFullYear());
    let stringDate: string = '';
    if (+currentDay.toLocaleString('default', {day: 'numeric'}) < 10) {
      stringDate = currentDay.toLocaleString('default', {month: 'long'}) + ' 0' +
        currentDay.toLocaleString('default', {day: 'numeric'}) + ', ' + 
        currentDay.toLocaleString('default', {year: 'numeric'});
    } else {
      stringDate = currentDay.toLocaleString('default', {month: 'long'}) + ' ' +
      currentDay.toLocaleString('default', {day: 'numeric'}) + ', ' + 
      currentDay.toLocaleString('default', {year: 'numeric'});
    }
    return stringDate;
  }

  changeMonth(value: number) {
    if (this.view === 'Month') {
      this.currentDate.setMonth(this.currentDate.getMonth()+value);
      this.currentMonth = this.currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
      this.currentDate = new Date(this.currentMonth);
      this.dayAmount = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0).getDate();
      this.previousAmount = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
      
      this.loadMonth();
    } else if (this.view === 'Week') {
      if (value === 1) {
        this.getCurrentWeek(7);
        this.loadWeek();
      }  
      else {
        this.getCurrentWeek(-7);
        this.loadWeek();
      }
    } else {

    }
    this.loadAppointments();
  }

  loadMonth() {
    this.monthSlots = [];
    let value: number = -1;
    let isCurrent: boolean = false;
    let date = '';
    let previousMonth = new Date();
    previousMonth.setMonth(this.currentDate.getMonth()-1);

    let nextMonth = new Date();
    nextMonth.setMonth(this.currentDate.getMonth()+1);

    for (let i: number = 0; i < 42; ++i) {
      if (i < this.currentDate.getDay()) {
        value = this.previousAmount+i-this.currentDate.getDay()+1;
        date = previousMonth.toLocaleString('default', {month: 'long'}) + ' ' + value + ', ' + previousMonth.toLocaleString('default', {year: 'numeric'});
        isCurrent = false;
      } else if (((i: number) => this.currentDate.getDay()) && (i < this.dayAmount+this.currentDate.getDay())) {
        value = i-this.currentDate.getDay()+1;
        date = this.currentDate.toLocaleString('default', {month: 'long'}) + ' ' + value + ', ' + this.currentDate.toLocaleString('default', {year: 'numeric'});
        isCurrent = true;
      } else {
        value = i-(this.dayAmount + this.currentDate.getDay()-1);
        date = nextMonth.toLocaleString('default', {month: 'long'}) + ' ' + value + ', ' + nextMonth.toLocaleString('default', {year: 'numeric'});
        isCurrent = false;
      }
      this.monthSlots.push(new MonthSlot(isCurrent, date));
    }
  }

  getCurrentWeek(byDays: number) {
    const today = this.currentDateWeek;
    today.setDate(today.getDate() + byDays);
    this.currentDateWeek = today;

    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    let first: string = firstDay.toLocaleString('default', {day: 'numeric', month: 'long'});
    let second: string = lastDay.toLocaleString('default', {day: 'numeric'});

    this.currentWeek = first + '-' + second + ', ' + firstDay.toLocaleString('default', {year: 'numeric'});
  }

  setView(view: string) {
    this.view = view;
    if (this.view === 'Month') {
      this.changeMonth(0);
    } else {
      this.getCurrentWeek(0);
      this.loadWeek();
      this.loadAppointments();
    }
  }

  selectTimeSlot(index: number) {    
    this.selectedTimeSlot = index;
    console.log(this.selectedTimeSlot);
    const role = localStorage.getItem('role');
    console.log(role);
    if (role === "ROLE_ADMIN_CENTER") {
      this.navigateToAppointmentReview(this.daySlots[index-1].appointment?.id || 0);
    }
  }

  public navigateToAppointmentReview(id: number) {
    this.router.navigateByUrl(`/appointment-processing/${id}`);
  }

  public defineAppointment():void{
     this.router.navigate(['appointments', this.centerId, this.workCalendar.id]);
  }

  selectMonthSlot(slot: MonthSlot) {
    this.selectedSlot = slot;
    console.log(this.selectedSlot);
  }

}
