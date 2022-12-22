import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  templateUrl: './custom-alert.component.html',
  styleUrls: ['./custom-alert.component.css']
})
export class CustomAlertComponent implements OnInit {
  @Input() alertMessage: string = 'Alert';
  @Input() type: string = 'no';

  constructor() { }

  ngOnInit(): void {
  }

}
