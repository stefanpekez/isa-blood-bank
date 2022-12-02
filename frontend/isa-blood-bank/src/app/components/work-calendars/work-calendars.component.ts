import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-calendars',
  templateUrl: './work-calendars.component.html',
  styleUrls: ['./work-calendars.component.css']
})
export class WorkCalendarsComponent implements OnInit {
  month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  currentMonth: string = '';
  currentDate: Date = {} as Date;

  constructor() { }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.currentMonth = this.currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
    this.currentDate = new Date(this.currentMonth);
  }

  changeMonth(value: number) {
    this.currentDate.setMonth(this.currentDate.getMonth()+value)
    this.currentMonth = this.currentDate.toLocaleString('default', {month: 'long', year: 'numeric'});
    this.currentDate = new Date(this.currentMonth);
  }

}
