import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InProgressInfoComponent } from './in-progress-info.component';

describe('InProgressInfoComponent', () => {
  let component: InProgressInfoComponent;
  let fixture: ComponentFixture<InProgressInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InProgressInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InProgressInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
