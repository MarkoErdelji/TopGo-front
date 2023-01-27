import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeperateUsersGraphComponent } from './admin-seperate-users-graph.component';

describe('AdminSeperateUsersGraphComponent', () => {
  let component: AdminSeperateUsersGraphComponent;
  let fixture: ComponentFixture<AdminSeperateUsersGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSeperateUsersGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSeperateUsersGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
