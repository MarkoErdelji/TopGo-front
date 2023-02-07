import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthService} from "../../_service/auth.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {RouterTestingModule} from "@angular/router/testing";
import {of, throwError} from "rxjs";
import {RideNotificationComponent} from "../dialogs/ride-notification/ride-notification.component";
import { HttpResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let matDialog: MatDialog;

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
      providers: [{ provide: AuthService },
        { provide: MatDialog }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    matDialog = TestBed.inject(MatDialog);
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

  it('should call create function and call signIn method', () => {
    const spy = spyOn(authService, 'signIn').and.returnValue(of(new HttpResponse<{}>({})));

    component.loginForm = new FormGroup({
      username: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required])
    });

    component.loginForm.controls.username.setValue("erdeljimarko@gmail.com")
    component.loginForm.controls.password.setValue("test")
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('#login-button')).nativeElement;
    submitButton.click();

    expect(spy).toHaveBeenCalledWith(
      component.loginForm.controls.username.value,
      component.loginForm.controls.password.value
    );
  });



}
)
