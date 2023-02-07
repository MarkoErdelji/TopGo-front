import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { RegisterComponent } from './register.component';
import {AuthService} from "../../_service/auth.service";
import {RideNotificationComponent} from "../dialogs/ride-notification/ride-notification.component";

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let authService: AuthService;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      declarations: [
        RegisterComponent,
        RideNotificationComponent
      ],
      providers: [
        RegisterComponent,
        AuthService,
        MatDialog
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    component = TestBed.inject(RegisterComponent);
    authService = TestBed.inject(AuthService);
    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('first name field validity', () => {
    let errors = {};
    let firstName = component.registerForm.controls['firstName'];
    expect(firstName.valid).toBeFalsy();

    // First name field is required
    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set first name to something invalid
    firstName.setValue("");
    errors = firstName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set first name to something valid
    firstName.setValue("John");
    errors = firstName.errors || {};
    expect(errors['required']).toBeFalsy();

    // First name must start with an uppercase letter
    firstName.setValue("john");
    errors = firstName.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });
  it('last name field validity', () => {
    let errors = {};
    let lastName = component.registerForm.controls['lastName'];
    expect(lastName.valid).toBeFalsy();

    // First name field is required
    errors = lastName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set first name to something invalid
    lastName.setValue("");
    errors = lastName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set first name to something valid
    lastName.setValue("John");
    errors = lastName.errors || {};
    expect(errors['required']).toBeFalsy();

    // First name must start with an uppercase letter
    lastName.setValue("john");
    errors = lastName.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });
  it('password field validity', () => {
    let errors = {};
    let password = component.registerForm.controls['password'];
    expect(password.valid).toBeFalsy();


    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();


    password.setValue("");
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();


    password.setValue("john");
    errors = password.errors!;
    expect(errors['minLength']).toBeTruthy();
  });
})
