import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverEarnedPerMonthGraphComponent } from './driver-earned-per-month-graph.component';

describe('DriverEarnedPerMonthGraphComponent', () => {
  let component: DriverEarnedPerMonthGraphComponent;
  let fixture: ComponentFixture<DriverEarnedPerMonthGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverEarnedPerMonthGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverEarnedPerMonthGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
