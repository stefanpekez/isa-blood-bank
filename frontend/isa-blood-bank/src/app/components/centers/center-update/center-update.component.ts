import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Center } from '../shared/center.model';
import { CenterService } from '../shared/center.service';

@Component({
  selector: 'app-center-update',
  templateUrl: './center-update.component.html',
  styleUrls: ['./center-update.component.css'],
  providers: [CenterService]
})
export class CenterUpdateComponent implements OnInit {
  centerObject: Center = {} as Center;

  constructor(private centerService: CenterService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
      this.centerService.getCenter(params['id'])
      .subscribe((response: Center ) => {
        this.centerObject = response;
      });
    })
  }
  public saveChanges() {
    this.centerService.updateCenter(this.centerObject)
    .subscribe((response: Center) => {
      window.location.reload();
    });
  }

}
