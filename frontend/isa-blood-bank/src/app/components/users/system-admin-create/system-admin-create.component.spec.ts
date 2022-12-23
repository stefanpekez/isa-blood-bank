import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminCreateComponent } from './system-admin-create.component';

describe('SystemAdminCreateComponent', () => {
  let component: SystemAdminCreateComponent;
  let fixture: ComponentFixture<SystemAdminCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemAdminCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemAdminCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
