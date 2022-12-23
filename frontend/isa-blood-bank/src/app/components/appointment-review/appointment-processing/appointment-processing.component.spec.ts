import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentProcessingComponent } from './appointment-processing.component';

describe('AppointmentProcessingComponent', () => {
  let component: AppointmentProcessingComponent;
  let fixture: ComponentFixture<AppointmentProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentProcessingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
