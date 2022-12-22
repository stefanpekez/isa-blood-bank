import { Component, OnInit } from '@angular/core';
import { Center } from '../../centers/shared/center.model';
import { CenterService } from '../../centers/shared/center.service';

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

  constructor(private centerService: CenterService) { }

  ngOnInit(): void {
    this.loadCenters();
  }

  public selectDate(event: any){
    this.pickedDate = event.target.value;
     /*this.appointment.scheduleTime =this.pickedDate;
     alert(JSON.stringify(this.appointment.scheduleTime));*/
  }

  public searchAppointment(){
    
  }

  public loadCenters() {
    this.centerService.getCenters().subscribe((response: Center[])=>{
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
    //this.loadCenters();
  } 

  

}
