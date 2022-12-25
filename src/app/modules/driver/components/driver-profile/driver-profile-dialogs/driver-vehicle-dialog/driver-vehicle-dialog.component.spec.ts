import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverVehicleDialogComponent } from './driver-vehicle-dialog.component';

describe('DriverVehicleDialogComponent', () => {
  let component: DriverVehicleDialogComponent;
  let fixture: ComponentFixture<DriverVehicleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverVehicleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverVehicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
