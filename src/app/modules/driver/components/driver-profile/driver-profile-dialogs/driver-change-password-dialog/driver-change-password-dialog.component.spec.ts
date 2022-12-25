import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverChangePasswordDialogComponent } from './driver-change-password-dialog.component';

describe('DriverChangePasswordDialogComponent', () => {
  let component: DriverChangePasswordDialogComponent;
  let fixture: ComponentFixture<DriverChangePasswordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverChangePasswordDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverChangePasswordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
