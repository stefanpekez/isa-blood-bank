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

  constructor(private centerService: CenterService) { }

  ngOnInit(): void {
    this.loadCenters();
  }

  public loadCenters() {
    this.centerService.getAll().subscribe((response: Center[])=>{
      this.centers = response;
    })
  }

  public filterRating(event:any){
    var selectRating = event.target.value;
    this.centerService.filterByRating(selectRating).subscribe((response: Center[])=>{
         this.centers = response;
    })
  }
}
