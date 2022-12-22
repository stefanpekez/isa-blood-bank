import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePredefinedComponent } from './schedule-predefined.component';

describe('SchedulePredefinedComponent', () => {
  let component: SchedulePredefinedComponent;
  let fixture: ComponentFixture<SchedulePredefinedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulePredefinedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulePredefinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
