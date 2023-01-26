import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideDayGraphComponent } from './ride-day-graph.component';

describe('RideDayGraphComponent', () => {
  let component: RideDayGraphComponent;
  let fixture: ComponentFixture<RideDayGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideDayGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideDayGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
