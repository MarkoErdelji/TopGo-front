import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let router: Router;
  let dialog: MatDialog;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        Router,
        MatDialog,
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
      expect(response).toEqual(expectedResponse);
    });

    const req = httpTestingController.expectOne(`${service.endpoint}/user/login`);
    expect(req.request.method).toEqual('POST');
    req.flush(expectedResponse);
  });
});