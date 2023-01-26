import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverNumOfRidesDateGraphComponent } from './driver-num-of-rides-date-graph.component';

describe('DriverNumOfRidesDateGraphComponent', () => {
  let component: DriverNumOfRidesDateGraphComponent;
  let fixture: ComponentFixture<DriverNumOfRidesDateGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverNumOfRidesDateGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverNumOfRidesDateGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
