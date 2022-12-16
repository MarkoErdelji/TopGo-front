import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredUserMenuComponent } from './registered-user-menu.component';

describe('RegisteredUserMenuComponent', () => {
  let component: RegisteredUserMenuComponent;
  let fixture: ComponentFixture<RegisteredUserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredUserMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
