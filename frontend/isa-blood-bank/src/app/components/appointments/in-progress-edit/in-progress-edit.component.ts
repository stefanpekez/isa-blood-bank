import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '../shared/appointment.service';
import { Report } from '../shared/report.model';

@Component({
  selector: 'app-in-progress-edit',
  templateUrl: './in-progress-edit.component.html',
  styleUrls: ['./in-progress-edit.component.css']
})
export class InProgressEditComponent implements OnInit {
  report: Report = {} as Report;

  constructor(private _activatedRoute: ActivatedRoute, private appointmentService: AppointmentService) { }

  ngOnInit(): void {
    this.report.permitted = false;
    const param = this._activatedRoute.snapshot.paramMap.get("id");
    if (param !== null) {
      this.report.idAppointment = +param;
    }
  }

  save() {
    console.log('save');
    console.log(this.report);
    if (this.report.bbAmount === '')
      return;
    if (this.report.hemoglobin === '')
      return;
    if (this.report.type === '')
      return;
    if (this.report.note === '')
      return;

    this.appointmentService.saveReport(this.report).subscribe((response: Report) => {
      console.log(response);
    });
  }

}
