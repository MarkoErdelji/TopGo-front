import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideNotificationComponent } from './ride-notification.component';

describe('RideNotificationComponent', () => {
  let component: RideNotificationComponent;
  let fixture: ComponentFixture<RideNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
