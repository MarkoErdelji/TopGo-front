import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeperateUsersEarnedGraphComponent } from './admin-seperate-users-earned-graph.component';

describe('AdminSeperateUsersEarnedGraphComponent', () => {
  let component: AdminSeperateUsersEarnedGraphComponent;
  let fixture: ComponentFixture<AdminSeperateUsersEarnedGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSeperateUsersEarnedGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSeperateUsersEarnedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
