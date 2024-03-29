import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

import { RegisterComponent } from './register.component';
import {AuthService} from "../../_service/auth.service";
import {RideNotificationComponent} from "../dialogs/ride-notification/ride-notification.component";
import { By } from '@angular/platform-browser';
import { RegisterData } from './RegisterDTO';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let authService: AuthService;
  let dialog: MatDialog;
  let fixture: ComponentFixture<RegisterComponent>;


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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
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

    firstName.setValue("John");
    errors = firstName.errors || {};
    expect(errors['pattern']).toBeFalsy();
  });
  it('last name field validity', () => {
    let errors = {};
    let lastName = component.registerForm.controls['lastName'];
    expect(lastName.valid).toBeFalsy();

    // Last name field is required
    errors = lastName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set last name to something invalid
    lastName.setValue("");
    errors = lastName.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set last name to something valid
    lastName.setValue("John");
    errors = lastName.errors || {};
    expect(errors['required']).toBeFalsy();

    // Last name must start with an uppercase letter
    lastName.setValue("john");
    errors = lastName.errors || {};
    expect(errors['pattern']).toBeTruthy();

    lastName.setValue("John");
    errors = lastName.errors || {};
    expect(errors['pattern']).toBeFalsy();
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
    errors = password.errors || {};
    expect(errors['minlength']).toBeTruthy();


    password.setValue("Johnathan123");
    errors = password.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });


  it('email field validity', () => {
    let errors = {};
    let email = component.registerForm.controls['email'];
    expect(email.valid).toBeFalsy();

    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue("");
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    email.setValue("John");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();

    email.setValue("john");
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();

    email.setValue("john@gmail.com");
    errors = email.errors || {};
    expect(errors['email']).toBeFalsy();

    
  });


  it('phone number field validity', () => {
    let errors = {};
    let phoneNumber = component.registerForm.controls['phoneNumber'];
    expect(phoneNumber.valid).toBeFalsy();

    errors = phoneNumber.errors || {};
    expect(errors['required']).toBeTruthy();

    phoneNumber.setValue("");
    errors = phoneNumber.errors || {};
    expect(errors['required']).toBeTruthy();

    phoneNumber.setValue("03123");
    errors = phoneNumber.errors || {};
    expect(errors['required']).toBeFalsy();

    phoneNumber.setValue("0632");
    errors = phoneNumber.errors || {};
    expect(errors['pattern']).toBeTruthy();

    phoneNumber.setValue("0631234133");
    errors = phoneNumber.errors || {};
    expect(errors['pattern']).toBeFalsy();
  });


  it('address field validity', () => {
    let errors = {};
    let adress = component.registerForm.controls['adress'];
    expect(adress.valid).toBeFalsy();

    errors = adress.errors || {};
    expect(errors['required']).toBeTruthy();

    adress.setValue("");
    errors = adress.errors || {};
    expect(errors['required']).toBeTruthy();

    adress.setValue("Vuka");
    errors = adress.errors || {};
    expect(errors['required']).toBeFalsy();

    adress.setValue("Hello World!");
    errors = adress.errors || {};
    expect(errors['pattern']).toBeTruthy();

    adress.setValue("Vuka karadzica 12,Zitiste");
    errors = adress.errors || {};
    expect(errors['pattern']).toBeFalsy();
  });


  it('should call the register method of the authService', () => {
    const spy = spyOn(authService, 'register').and.returnValue(of(new HttpResponse<{}>({})));

    component.registerForm = new FormGroup({
      firstName: new FormControl("",[Validators.required,Validators.pattern(/^\p{Lu}[\p{L}]*/u)]),
      lastName: new FormControl("",[Validators.required,Validators.pattern(/^\p{Lu}[\p{L}]*/u)]),
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required,Validators.minLength(6)]),
      phoneNumber: new FormControl("",[Validators.required,Validators.pattern('^[0-9+].{8,11}$')]),
      adress: new FormControl("",[Validators.required,Validators.pattern(/^[\p{L}\p{N},\s]+$/u)])
    });
    component.registerForm.controls.firstName.setValue("John");
    component.registerForm.controls.lastName.setValue("Doe");
    component.registerForm.controls.email.setValue("johndoe@gmail.com");
    component.registerForm.controls.password.setValue("test123");
    component.registerForm.controls.phoneNumber.setValue("123456789");
    component.registerForm.controls.adress.setValue("Vuka karadzica 12,Zitiste")


    let registeredData:RegisterData= {

      name:    component.registerForm.controls.firstName.value,
      surname:    component.registerForm.controls.lastName.value,
      email:component.registerForm.controls.email.value,
      profilePicture:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QB4RXhpZgAASUkqAAgAAAABAA4BAgBWAAAAGgAAAAAAAABEZWZhdWx0IGF2YXRhciBwaG90byBwbGFjZWhvbGRlci4gR3JleSBwcm9maWxlIHBpY3R1cmUgaWNvbi4gQnVzaW5lc3MgbWFuIGlsbHVzdHJhdGlvbv/hBXpodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iPgoJPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KCQk8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOklwdGM0eG1wQ29yZT0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcENvcmUvMS4wL3htbG5zLyIgICB4bWxuczpHZXR0eUltYWdlc0dJRlQ9Imh0dHA6Ly94bXAuZ2V0dHlpbWFnZXMuY29tL2dpZnQvMS4wLyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwbHVzPSJodHRwOi8vbnMudXNlcGx1cy5vcmcvbGRmL3htcC8xLjAvIiAgeG1sbnM6aXB0Y0V4dD0iaHR0cDovL2lwdGMub3JnL3N0ZC9JcHRjNHhtcEV4dC8yMDA4LTAyLTI5LyIgeG1sbnM6eG1wUmlnaHRzPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvcmlnaHRzLyIgcGhvdG9zaG9wOkNyZWRpdD0iR2V0dHkgSW1hZ2VzL2lTdG9ja3Bob3RvIiBHZXR0eUltYWdlc0dJRlQ6QXNzZXRJRD0iMTMyNzU5MjUwNiIgeG1wUmlnaHRzOldlYlN0YXRlbWVudD0iaHR0cHM6Ly93d3cuaXN0b2NrcGhvdG8uY29tL2xlZ2FsL2xpY2Vuc2UtYWdyZWVtZW50P3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsIiA+CjxkYzpjcmVhdG9yPjxyZGY6U2VxPjxyZGY6bGk+QW5kcmVpIEFwb2V2PC9yZGY6bGk+PC9yZGY6U2VxPjwvZGM6Y3JlYXRvcj48ZGM6ZGVzY3JpcHRpb24+PHJkZjpBbHQ+PHJkZjpsaSB4bWw6bGFuZz0ieC1kZWZhdWx0Ij5EZWZhdWx0IGF2YXRhciBwaG90byBwbGFjZWhvbGRlci4gR3JleSBwcm9maWxlIHBpY3R1cmUgaWNvbi4gQnVzaW5lc3MgbWFuIGlsbHVzdHJhdGlvbjwvcmRmOmxpPjwvcmRmOkFsdD48L2RjOmRlc2NyaXB0aW9uPgo8cGx1czpMaWNlbnNvcj48cmRmOlNlcT48cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz48cGx1czpMaWNlbnNvclVSTD5odHRwczovL3d3dy5pc3RvY2twaG90by5jb20vcGhvdG8vbGljZW5zZS1nbTEzMjc1OTI1MDYtP3V0bV9tZWRpdW09b3JnYW5pYyZhbXA7dXRtX3NvdXJjZT1nb29nbGUmYW1wO3V0bV9jYW1wYWlnbj1pcHRjdXJsPC9wbHVzOkxpY2Vuc29yVVJMPjwvcmRmOmxpPjwvcmRmOlNlcT48L3BsdXM6TGljZW5zb3I+CgkJPC9yZGY6RGVzY3JpcHRpb24+Cgk8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJ3Ij8+Cv/tAKZQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAAiRwCUAAMQW5kcmVpIEFwb2V2HAJ4AFZEZWZhdWx0IGF2YXRhciBwaG90byBwbGFjZWhvbGRlci4gR3JleSBwcm9maWxlIHBpY3R1cmUgaWNvbi4gQnVzaW5lc3MgbWFuIGlsbHVzdHJhdGlvbhwCbgAYR2V0dHkgSW1hZ2VzL2lTdG9ja3Bob3RvAP/bAEMACgcHCAcGCggICAsKCgsOGBAODQ0OHRUWERgjHyUkIh8iISYrNy8mKTQpISIwQTE0OTs+Pj4lLkRJQzxINz0+O//bAEMBCgsLDg0OHBAQHDso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kkkkkkkkkkkkkkkAAAAkgkkkkkkkkkkkkkkkkkkkkkkkkkkkkkggAAAAAAAkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgAAAAAAAAAAkkkkkkkkkkkkkkkkkkkkkkkkkkkkAAAAAAAAAAAkkkkkkkkkkkkkkkkkkkkkkkkkkkgAAAAAAAAAAEEkkkkkkkkkkkkkkkkkkkkkkkkkEAAAAAAAAAAAEkkkkkkkkkkkkkkkkkkkkkkkkkkAAAAAAAAAAAAgkkkkkkkkkkkkkkkkkkkkkkkkkAAAAAAAAAAAAAkkkkkkkkkkkkkkkkkkkkkkkkkAAAkgEEkAkkAAAkkkkkkkkkkkkkkkkkkkkkkkkAAkkkkkkkkkEAAAkkkkkkkkkkkkkkkkkkkkkkkgAEkkkkkkkkkgAAEkkkkkkkkkkkkkkkkkkkkkkkgAkkkkkkkkkkAAEkkkkkkkkkkkkkkkkkkkkkkkkgEkkkkkkkkkkAAkkkkkkkkkkkkkkkkkkkkkkkkkAkkkkkkkkkkgAAkkkkkkkkkkkkkkkkkkkkkkkkgEkkkkkkkkkgAEkkkkkkkkkkkkkkkkkkkkkkkkkEkkkkkkkkkkAAEkkkkkkkkkkkkkkkkkkkkkkkkgEkkkkkkkkkgAEkkkkkkkkkkkkkkkkkkkkkkkkgEkkkkkkkkkkAAkkkkkkkkkkkkkkkkkkkkkkkkkEkkkkkkkkkkkAAkkkkkkkkkkkkkkkkkkkkkkkkkEkkkkkkkkkkgAAkkkkkkkkkkkkkkkkkkkkkkkggkkkkkkkkkkkAkgkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkEkkkkkkkkkkkkkkkkkkkkkkggkkkkkkkkkkkgkkkkkkkkkkkkkkkkkkkkkkkkkEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkEkkkkkkkkkkkkgkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgEkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkEkkkkkkkkkkkkkkkkkkkkkkkkkkgkkkkkkkkkkAkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkgkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkEkkkkkkkkk0kkkkkkkkkkkkkkkkkkkkkkkkkkkkEkkkkkkkkWkkkkkkkkkkkkkkkkkkkkkkkkkkkkgkkkkkkkkywkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkEm0kkkkkkkkkkkkkkkkkkkkkkkkkkkkkAgkkkgAAAkEkkkkkkkkkkkkkkkkkkkkkkkkkkkgAAAEkAAAkgkkkkkkkkkkkkkkkkkkkkkkkkkkkkkAAAAAAAkkEkkkkkkkkkkkkkkkkkkkkkkkkkkkkgAAAAAAEkkEkkkkkkkkkkkkkkkkkkkkkkkkkkkgAAAAAAEkgAAkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkAAgkkkkkkkkkkkkkkkkkkkkkkkkkgEAAAAAkkkgAAAkkkkkkkkkkkkkkkkkkkkkkkkgAgAAAAEkkEAAAkkkkkkkkkkkkkkkkkkkkkkkkgAAAAAAEkkAAAAAAEkkkkkkkkkkkkkkkkkkkkkgAAEkkkEkkkAAAAAAAkkkkkkkkkkkkkkkkkkkkgEkAkkkEkkkAAAAAAAAEkkkkkkkkkkkkkkkkkkkAkgEkkkkkkAAAAAAAAEkkkkkkkkkkkkkkkkkgAAEkkkkkkkkAAAAAAAAAAEEkkkkkkkkkkkkkkAAAAkAEkAgkgAAAAAAAAAAAEAkkkkkkkkkkkkAgAAAEgEgAgkkAAAAAAAAAAAAAEkkkkkkkkkkkgAAAAEAAEEgkAAAAAAAAAAAAAAAEgkkkkkkkEkAAAAAAAkEkAEgEAAAAAAAAAAAAAAAAEkkkkkkAAAAAAAEEkkkAgEAAAAAAAAAAAAAAAAEEkkkkkgAAAAAAAgkkkkgAAAAAAAAAAAAAAAAAAAkkkkkgAAAAAAAEkkkkkkgAAAAAAAAAAAAAAAAAEkkkkgAAAAAAAAkkkkkkgAAAAAAAAAAAAAAAAAAAkkkkgAAAAAAAEkkkkkAAAAAAAAAAAAAAAAAAAAEkkkAAAAAAAAEkkkkkgAAAAAAAAAAAAAAAAAAAAkkkgAAAAAAAAkkk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",
      password:    component.registerForm.controls.password.value,
      telephoneNumber:component.registerForm.controls.phoneNumber.value,
      address:    component.registerForm.controls.adress.value!

    }

    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('#register-button')).nativeElement;
    submitButton.click();

    expect(spy).toHaveBeenCalledWith(
      registeredData
    );
  }
  )

})
