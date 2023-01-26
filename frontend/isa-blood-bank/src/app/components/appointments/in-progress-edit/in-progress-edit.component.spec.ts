import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressEditComponent } from './in-progress-edit.component';

describe('InProgressEditComponent', () => {
  let component: InProgressEditComponent;
  let fixture: ComponentFixture<InProgressEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InProgressEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InProgressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
