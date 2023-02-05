import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverPriceDateGraphComponent } from './driver-price-date-graph.component';

describe('DriverPriceDateGraphComponent', () => {
  let component: DriverPriceDateGraphComponent;
  let fixture: ComponentFixture<DriverPriceDateGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverPriceDateGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverPriceDateGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
