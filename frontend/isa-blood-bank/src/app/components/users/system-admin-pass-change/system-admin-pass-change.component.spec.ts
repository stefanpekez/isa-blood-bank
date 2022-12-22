import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAdminPassChangeComponent } from './system-admin-pass-change.component';

describe('SystemAdminPassChangeComponent', () => {
  let component: SystemAdminPassChangeComponent;
  let fixture: ComponentFixture<SystemAdminPassChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemAdminPassChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemAdminPassChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
