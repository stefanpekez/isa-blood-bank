import { Component, OnInit } from '@angular/core';
import { Center } from './shared/center.model';
import { CenterService } from './shared/center.service';

@Component({
  selector: 'app-centers',
  templateUrl: './centers.component.html',
  styleUrls: ['./centers.component.css']
})
export class CentersComponent implements OnInit {

  centers: Center[] = [];
  name: string = "";
  streetName: string ="";
  townName: string = "";
  ratingScore: String[] = ["1","2","3","4","5"];
  selectRating = -1.0;
  sortBy = '';
  sortOrder = 0;
  orderValues = ['', 'asc', 'desc']

  constructor(private centerService: CenterService) { }

  ngOnInit(): void {
    this.loadCenters();
  }

  public loadCenters() {
    if(this.selectRating === -1.0 && this.orderValues[this.sortOrder] === '') {
      this.centerService.getCenters().subscribe((response: Center[])=>{
        this.centers = response;
      })  
    } else {
      this.centerService.getCenters(this.selectRating, this.sortBy, this.orderValues[this.sortOrder]).subscribe((response: Center[])=>{
        this.centers = response;
      })  
    }
  }

  public filterRating(event:any){
    this.selectRating = event.target.value;
    this.loadCenters();
  }

  public handleSort(event: Event, value: string) {
    event.preventDefault();
    if(this.sortBy !== value) {
      this.sortOrder = 1;
      this.sortBy = value;
    } else {
      this.sortOrder = (this.sortOrder + 1) % 3;
    }
    this.loadCenters();
  } 

}
