import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverChangeImageDialogComponent } from './driver-change-image-dialog.component';

describe('DriverChangeImageDialogComponent', () => {
  let component: DriverChangeImageDialogComponent;
  let fixture: ComponentFixture<DriverChangeImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverChangeImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverChangeImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
