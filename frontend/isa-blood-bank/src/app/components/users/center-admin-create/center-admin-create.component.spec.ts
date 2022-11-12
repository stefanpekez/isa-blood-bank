import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterAdminCreateComponent } from './center-admin-create.component';

describe('CenterAdminCreateComponent', () => {
  let component: CenterAdminCreateComponent;
  let fixture: ComponentFixture<CenterAdminCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CenterAdminCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CenterAdminCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
