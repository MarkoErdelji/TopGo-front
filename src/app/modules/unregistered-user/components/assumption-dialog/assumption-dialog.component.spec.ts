import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssumptionDialogComponent } from './assumption-dialog.component';

describe('AssumptionDialogComponent', () => {
  let component: AssumptionDialogComponent;
  let fixture: ComponentFixture<AssumptionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssumptionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssumptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
