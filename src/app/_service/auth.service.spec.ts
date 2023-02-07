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
});