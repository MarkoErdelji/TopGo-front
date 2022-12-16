import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredRouteFormComponent } from './registered-route-form.component';

describe('RegisteredRouteFormComponent', () => {
  let component: RegisteredRouteFormComponent;
  let fixture: ComponentFixture<RegisteredRouteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisteredRouteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisteredRouteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
