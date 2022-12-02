import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkCalendarsComponent } from './work-calendars.component';

describe('WorkCalendarsComponent', () => {
  let component: WorkCalendarsComponent;
  let fixture: ComponentFixture<WorkCalendarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkCalendarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkCalendarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
