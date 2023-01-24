import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNoteDialogComponent } from './admin-note-dialog.component';

describe('AdminNoteDialogComponent', () => {
  let component: AdminNoteDialogComponent;
  let fixture: ComponentFixture<AdminNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNoteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
