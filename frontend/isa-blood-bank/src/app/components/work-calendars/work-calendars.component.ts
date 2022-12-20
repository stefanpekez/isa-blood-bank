import { Component, OnInit } from '@angular/core';
import { Appointment } from './shared/appointment';
import { DaySlot } from './shared/day-slot';
import { MonthSlot } from './shared/month-slot';

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

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 24; ++i) {
      if (i === 23) {
        this.hours.push(i + ':00-' + '00:00');
        continue;
      }
      this.hours.push(i + ':00-' + (i+1) + ':00');
    }

    // Hardkodovani pregledi radi testiranja prikaza
    this.appointments.push(new Appointment('December 18, 2022', '2:00-3:00'));
    this.appointments.push(new Appointment('December 18, 2022', '3:00-4:00'));
    this.appointments.push(new Appointment('December 21, 2022', '7:00-8:00'));

    this.currentDateWeek = new Date();
    this.loadWeek();

    this.currentDate = new Date();
    this.getCurrentWeek(0);
    this.changeMonth(0);
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
          if (this.monthSlots[j].date === this.appointments[i].date) {
            this.monthSlots[j].addAppointment(this.appointments[i]);
          }
        }
      }
    } else {
      for (let i = 0; i < this.appointments.length; ++i) {
        for (let j = 0; j < this.daySlots.length; ++j) {
          if (this.appointments[i].date === this.daySlots[j].date
              && this.appointments[i].time === this.daySlots[j].time) {
                this.daySlots[j].appointment = this.appointments[i];
          }
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
    return currentDay.toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric'});
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
  }

}
