import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteNameDialogComponent } from './favourite-name-dialog.component';

describe('FavouriteNameDialogComponent', () => {
  let component: FavouriteNameDialogComponent;
  let fixture: ComponentFixture<FavouriteNameDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouriteNameDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteNameDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
