import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverProfileEditComponent } from './driver-profile-edit.component';

describe('DriverProfileEditComponent', () => {
  let component: DriverProfileEditComponent;
  let fixture: ComponentFixture<DriverProfileEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverProfileEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
