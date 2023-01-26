import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredReportsComponent } from './registered-reports.component';

describe('RegisteredReportsComponent', () => {
  let component: RegisteredReportsComponent;
  let fixture: ComponentFixture<RegisteredReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
