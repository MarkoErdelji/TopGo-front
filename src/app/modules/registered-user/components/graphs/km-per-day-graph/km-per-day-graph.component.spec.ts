import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmPerDayGraphComponent } from './km-per-day-graph.component';

describe('KmPerDayGraphComponent', () => {
  let component: KmPerDayGraphComponent;
  let fixture: ComponentFixture<KmPerDayGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KmPerDayGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KmPerDayGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
