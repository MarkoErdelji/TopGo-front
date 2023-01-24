import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateNoteDialogComponent } from './admin-create-note-dialog.component';

describe('AdminCreateNoteDialogComponent', () => {
  let component: AdminCreateNoteDialogComponent;
  let fixture: ComponentFixture<AdminCreateNoteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateNoteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
