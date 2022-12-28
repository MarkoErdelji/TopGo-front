import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredHomeComponent } from './registered-home.component';

describe('RegisteredHomeComponent', () => {
  let component: RegisteredHomeComponent;
  let fixture: ComponentFixture<RegisteredHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
