import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllDriversKilometersGraphComponent } from './admin-all-drivers-kilometers-graph.component';

describe('AdminAllDriversKilometersGraphComponent', () => {
  let component: AdminAllDriversKilometersGraphComponent;
  let fixture: ComponentFixture<AdminAllDriversKilometersGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllDriversKilometersGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllDriversKilometersGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
