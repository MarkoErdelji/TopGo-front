import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import {RegisterData} from "../components/register/RegisterDTO";
import {PassengerInfoDTO} from "../modules/DTO/PassengerInfoDTO";
class MockRouter {
  navigate() {}
}

class MockMatDialogRef<T, R = any> {
  close() {
    return of({});
  }

  afterClosed() {
    return of({});
  }
}

class MockMatDialog {
  open() {
    return new MockMatDialogRef<any>();
  }
}

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let router: Router;
  let dialog: MatDialog;
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useClass: MockRouter },
        {provide:MatDialog, useClass:MockMatDialog},
        JwtHelperService,
      ],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign in the user', () => {
    const username = 'test@test.com';
    const password = 'testpassword';
    const expectedResponse:any= {
      accessToken: 'access_token_123',
      refreshToken: 'access_token_123'
    };

    service.signIn(username, password).subscribe((response) => {
      expect(response.body).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(`${service.endpoint}/user/login`);
    expect(req.request.method).toEqual('POST');
    req.flush(expectedResponse);
  });


  it('should fail to sign in the user with wrong credentials', () => {
    const username = 'test@test.com';
    const password = 'testpassword';

    service.signIn(username, password).subscribe((response) => {
      expect(response.body.status).toEqual(400);
      expect(response.body.message).toEqual("Wrong username or password!");
    });

    const req = httpTestingController.expectOne(`${service.endpoint}/user/login`);
    expect(req.request.method).toEqual('POST');
    req.flush({ status: 400, message: "Wrong username or password!" });
  });
  it('should give back correct user id',()=>
  {
    localStorage.setItem("access_token","eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXNzZW5nZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlkIjoyMSwiZXhwIjoxNjc1ODE1OTQwLCJpYXQiOjE2NzU3OTc5NDB9.a-pkaJiaRjwde4Y0wSNmXQuvF1G-xqu499F8tFqM8gxpxK_hWA1YATQRSmiAAR5EeV6c5f56TImBVLp0GQmZAw");
    let userId:number = service.getUserId();
    expect(userId).toEqual(21);

  });
  it('should give back no user id',()=>
  {
    localStorage.setItem("access_token","eyJhbGciOiJIUzUxMiJ9..a-pkaJiaRjwde4Y0wSNmXQuvF1G-xqu499F8tFqM8gxpxK_hWA1YATQRSmiAAR5EeV6c5f56TImBVLp0GQmZAw");

    expect(service.getUserId()).toEqual(null);

  });
  it('should give back correct role',()=>
  {
    localStorage.setItem("access_token","eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXNzZW5nZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlkIjoyMSwiZXhwIjoxNjc1ODE1OTQwLCJpYXQiOjE2NzU3OTc5NDB9.a-pkaJiaRjwde4Y0wSNmXQuvF1G-xqu499F8tFqM8gxpxK_hWA1YATQRSmiAAR5EeV6c5f56TImBVLp0GQmZAw");
    expect(service.getUserRole()).toEqual("USER");

  });
  it('should give back correct null',()=>
  {
    localStorage.setItem("access_token","eyJhbGciOiJIUzUxMiJ9..a--xqu499F8tFqM8gxpxK_hWA1YATQRSmiAAR5EeV6c5f56TImBVLp0GQmZAw");
    expect(service.getUserRole()).toEqual(null);

  });
  it('should give back correct email',()=>
  {
    localStorage.setItem("access_token","eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXNzZW5nZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlkIjoyMSwiZXhwIjoxNjc1ODE1OTQwLCJpYXQiOjE2NzU3OTc5NDB9.a-pkaJiaRjwde4Y0wSNmXQuvF1G-xqu499F8tFqM8gxpxK_hWA1YATQRSmiAAR5EeV6c5f56TImBVLp0GQmZAw");
    expect(service.getEmail()).toEqual("passenger@example.com");

  });
  it('should give back correct null',()=>
  {
    localStorage.setItem("access_token","eyJhbGciOiJIUzUxMiJ9..a--xqu499F8tFqM8gxpxK_hWA1YATQRSmiAAR5EeV6c5f56TImBVLp0GQmZAw");
    expect(service.getEmail()).toEqual(null);

  });
  it('should sign up the user', () => {
    const userForSingUp:RegisterData =
    {
      name:"Test",
      surname:"Testovic",
      profilePicture:"bla",
      telephoneNumber:"test",
      email:"test@example.com",
      address:"test",
      password:"123"

    }
    const expectedResponse:PassengerInfoDTO= {
      id:1,
      name:"Test",
      surname:"Testovic",
      profilePicture:"bla",
      telephoneNumber:"test",
      email:"test@example.com",
      address:"test",
    };

    service.register(userForSingUp).subscribe((response) => {
      expect(response.body).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(`${service.endpoint}/passenger`);
    expect(req.request.method).toEqual('POST');
    req.flush(expectedResponse);
  });
});
