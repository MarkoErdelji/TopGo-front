import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverKmDateGraphComponent } from './driver-km-date-graph.component';

describe('DriverKmDateGraphComponent', () => {
  let component: DriverKmDateGraphComponent;
  let fixture: ComponentFixture<DriverKmDateGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverKmDateGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverKmDateGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
