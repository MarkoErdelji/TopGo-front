import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllDriversEarnGraphComponent } from './admin-all-drivers-earn-graph.component';

describe('AdminAllDriversEarnGraphComponent', () => {
  let component: AdminAllDriversEarnGraphComponent;
  let fixture: ComponentFixture<AdminAllDriversEarnGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllDriversEarnGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllDriversEarnGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
