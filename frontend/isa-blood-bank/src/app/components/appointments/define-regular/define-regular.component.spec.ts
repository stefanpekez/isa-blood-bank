import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineRegularComponent } from './define-regular.component';

describe('DefineRegularComponent', () => {
  let component: DefineRegularComponent;
  let fixture: ComponentFixture<DefineRegularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefineRegularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefineRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
