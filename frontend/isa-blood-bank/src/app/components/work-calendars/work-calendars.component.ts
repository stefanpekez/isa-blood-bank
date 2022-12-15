import { Component, OnInit } from '@angular/core';
import { WorkCalendarItem } from './shared/work-calendar-item';

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
  calendarItems: WorkCalendarItem[] = [];
  view: string = 'Week';
  hours: string[] = [];
  appointmentAmount: number = 0;
  selectedTimeSlot: number = -1;

  constructor() { }

  ngOnInit(): void {
    for (let i = 0; i < 24; ++i) {
      this.hours.push(i + ':00');
    }

    this.currentDate = new Date();
    this.currentDateWeek = new Date();
    this.getCurrentWeek(0);
    this.currentMonth = this.currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
    this.currentDate = new Date(this.currentMonth);
    this.dayAmount = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0).getDate();
    this.previousAmount = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
    console.log('Previous: ' + this.previousAmount);
    this.loadCalendar();
  }

  // changeMonth(value: number) {
    // this.currentDate.setMonth(this.currentDate.getMonth()+value)
    // this.currentMonth = this.currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
    // this.currentDate = new Date(this.currentMonth);
    // this.dayAmount = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0).getDate();
    // this.previousAmount = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
    
    // this.loadCalendar();
  // }

  changeMonth(value: number) {
    if (this.view === 'Month') {
      this.currentDate.setMonth(this.currentDate.getMonth()+value)
      this.currentMonth = this.currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
      this.currentDate = new Date(this.currentMonth);
      this.dayAmount = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0).getDate();
      this.previousAmount = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
      
      this.loadCalendar();
    } else if (this.view === 'Week') {
      if (value === 1)
        this.getCurrentWeek(7);
      else 
        this.getCurrentWeek(-7);
      
    } else {

    }


    // this.currentDate.setMonth(this.currentDate.getMonth()+value)
    // this.currentMonth = this.currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
    // this.currentDate = new Date(this.currentMonth);
    // this.dayAmount = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0).getDate();
    // this.previousAmount = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
    
    // this.loadCalendar();
  }

  loadCalendar() {
    this.calendarItems = [];
    let value: number = -1;
    let isCurrent: boolean = false;
    for (let i: number = 0; i < 42; ++i) {
      if (i < this.currentDate.getDay()) {
        value = this.previousAmount+i-this.currentDate.getDay()+1;
        isCurrent = false;
      } else if (((i: number) => this.currentDate.getDay()) && (i < this.dayAmount+this.currentDate.getDay())) {
        value = i-this.currentDate.getDay()+1;
        isCurrent = true;
      } else {
        value = i-(this.dayAmount + this.currentDate.getDay()-1);
        isCurrent = false;
      }
      this.calendarItems.push(new WorkCalendarItem(value, isCurrent));
    }
  }

  getCurrentWeek(byDays: number) {
    const today = this.currentDateWeek;
    today.setDate(today.getDate() + byDays);
    this.currentDateWeek = today;

    const firstDay = new Date(today.setDate(today.getDate() - today.getDay()));
    const lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    console.log(firstDay);
    console.log(lastDay);

    let first: string = firstDay.toLocaleString('default', {day: 'numeric', month: 'long'});
    let second: string = lastDay.toLocaleString('default', {day: 'numeric'});

    this.currentWeek = first + '-' + second + ', ' + firstDay.toLocaleString('default', {year: 'numeric'});

    console.log('Current week: ' + this.currentWeek);
  }

  setView(view: string) {
    this.view = view;
    console.log('Selected view: ' + this.view);
  }

  schedule(timeSlot: number) {
    this.appointmentAmount += 1;
    (<HTMLElement>document.querySelector('.week-slot:nth-child(timeSlot)')).style.height = "8.25em";
    (<HTMLElement>document.querySelector('.week-slot:nth-child(timeSlot)')).style.backgroundColor = "rgb(255, 255, 142)";

  }

  selectTimeSlot(index: number) {
    this.selectedTimeSlot = index;
    console.log(this.selectedTimeSlot);
  }

}
