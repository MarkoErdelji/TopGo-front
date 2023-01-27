import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllDriversRidesGraphComponent } from './admin-all-drivers-rides-graph.component';

describe('AdminAllDriversRidesGraphComponent', () => {
  let component: AdminAllDriversRidesGraphComponent;
  let fixture: ComponentFixture<AdminAllDriversRidesGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllDriversRidesGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllDriversRidesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
