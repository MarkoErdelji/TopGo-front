import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendInviteDialogComponent } from './friend-invite-dialog.component';

describe('FriendInviteDialogComponent', () => {
  let component: FriendInviteDialogComponent;
  let fixture: ComponentFixture<FriendInviteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendInviteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendInviteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
