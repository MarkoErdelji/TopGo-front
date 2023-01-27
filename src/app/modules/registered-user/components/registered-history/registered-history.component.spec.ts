import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredHistoryComponent } from './registered-history.component';

describe('RegisteredHistoryComponent', () => {
  let component: RegisteredHistoryComponent;
  let fixture: ComponentFixture<RegisteredHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
