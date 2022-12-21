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
  name: string = '';
  streetName: string ='';
  townName: string = '';
  ratingScoreMin: number[] = [1.0, 2.0, 3.0, 4.0];
  ratingScoreMax: number[] = [5.0, 4.0, 3.0, 2.0];
  selectRatingMin = -1.0;
  selectRatingMax = -1.0;
  sortBy = '';
  sortOrder = 0;
  orderValues = ['', 'asc', 'desc']

  constructor(private centerService: CenterService) { }

  ngOnInit(): void {
    this.loadCenters();
  }

  public loadCenters() {
    if((this.selectRatingMin === -1.0 && this.selectRatingMax === -1.0 && this.orderValues[this.sortOrder] === '' && this.name === '' && this.streetName === '' && this.townName === '')
       ||( this.selectRatingMax <= this.selectRatingMin && (this.selectRatingMin !== -1.0 || this.selectRatingMax !== -1.0))) {
      this.centerService.getCenters().subscribe((response: Center[])=>{
        this.centers = response;
      })  
    } else {
      this.centerService.getCenters(this.selectRatingMin, this.selectRatingMax, this.sortBy, this.orderValues[this.sortOrder], this.name, this.streetName, this.townName).subscribe((response: Center[])=>{
        this.centers = response;
      })  
    }
  }

  public filterRatingMin(event:any){
    event.preventDefault();
    if(this.selectRatingMin < this.selectRatingMax)
      this.loadCenters();
  }

  public filterRatingMax(event:any){
    event.preventDefault();
    if(this.selectRatingMax > this.selectRatingMin)
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

  public searchCenters(){
    if(this.name !== '' || this.streetName !== '' || this.townName !== '')
      this.loadCenters();
    else alert("please input search parameters");
  }

  public clearSearchInputs(){
    this.name = '';
    this.streetName = '';
    this.townName = '';
    this.loadCenters();
  }
}
