import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSeperateUsersNumOfRidesGraphComponent } from './admin-seperate-users-num-of-rides-graph.component';

describe('AdminSeperateUsersNumOfRidesGraphComponent', () => {
  let component: AdminSeperateUsersNumOfRidesGraphComponent;
  let fixture: ComponentFixture<AdminSeperateUsersNumOfRidesGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSeperateUsersNumOfRidesGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSeperateUsersNumOfRidesGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
