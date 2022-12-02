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
  currentDate: Date = {} as Date;
  dayAmount: number = -1;
  previousAmount: number = -1;
  calendarItems: WorkCalendarItem[] = [];

  constructor() { }

  ngOnInit(): void {
    
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
    this.currentDate = new Date(this.currentMonth);
    this.dayAmount = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0).getDate();
    this.previousAmount = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
    console.log('Previous: ' + this.previousAmount);
    this.loadCalendar();
    // console.log(this.dayAmount);
  }

  changeMonth(value: number) {
    this.currentDate.setMonth(this.currentDate.getMonth()+value)
    this.currentMonth = this.currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
    this.currentDate = new Date(this.currentMonth);
    this.dayAmount = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0).getDate();
    this.previousAmount = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();
    
    this.loadCalendar();
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

}
