import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredInboxComponent } from './registered-inbox.component';

describe('RegisteredInboxComponent', () => {
  let component: RegisteredInboxComponent;
  let fixture: ComponentFixture<RegisteredInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredInboxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
