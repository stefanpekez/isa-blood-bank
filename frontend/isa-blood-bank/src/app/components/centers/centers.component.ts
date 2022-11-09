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

  constructor(private centerService: CenterService) { }

  ngOnInit(): void {
    // this.loadCenters();
  }

  public loadCenters() {
    this.centerService.getAll().subscribe((response: any) => {
      // this.centers = response;
      console.log(response);
    });
  }

}
