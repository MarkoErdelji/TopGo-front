import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthService} from "../../_service/auth.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import {of, throwError} from "rxjs";
import {RideNotificationComponent} from "../dialogs/ride-notification/ride-notification.component";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let dialog: MatDialog

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatDialogModule
      ],
      declarations: [LoginComponent],
      providers: [AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('username field validity', () => {
    let username = component.loginForm.controls['username'];
    expect(username.valid).toBeFalsy();

    username.setValue("");
    expect(username.hasError('required')).toBeTruthy();

    username.setValue("test");
    expect(username.valid).toBeTruthy();
  });

  it('password field validity', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue("");
    expect(password.hasError('required')).toBeTruthy();

    password.setValue("test");
    expect(password.valid).toBeTruthy();
  });

  it('form should be valid when all fields are filled', () => {
    component.loginForm.controls['username'].setValue("test");
    component.loginForm.controls['password'].setValue("test");
    expect(component.loginForm.valid).toBeTruthy();
  });


}
)
