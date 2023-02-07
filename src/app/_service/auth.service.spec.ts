import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';
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
      imports: [HttpClientTestingModule,RouterTestingModule.withRoutes(routes)],
      providers: [
        AuthService,
        {provide:MatDialog, useClass:MockMatDialog},
        JwtHelperService,
      ],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
    router.initialNavigation();
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


  it('should return correct token from storage',()=>{
    const access_token = 'access_token_123';
    localStorage.setItem('access_token',access_token);
    expect(service.getToken()).toEqual(access_token);
  })


  it('should return no token from storage',()=>{
    expect(service.getToken()).toEqual(null);
  })

  it('should empty local storage on logout',()=>{
    localStorage.setItem("access_token","AccessToken");
    localStorage.setItem("refresh_token","AccessToken");
    service.doLogout()
    expect(localStorage.getItem("access_token")).toEqual(null);
    expect(localStorage.getItem("refresh_token")).toEqual(null);
  })

  it('should stay on same page if token does not exist', ()=>{
    const locationCurrent = location;
    service.checkForToken();
    expect(location).toBe(locationCurrent);  
  })

  it('should go to user page if token is users and not expired', ()=>{
    const navigateSpy = spyOn(router, 'navigate');

    const userJwt = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXNzZW5nZXJAZXhhbXBsZS5jb20iLCJyb2xlIjoiVVNFUiIsImlkIjoyMSwiZXhwIjozMDAwMDAwMDAwLCJpYXQiOjE2NzU3OTc5NDB9.cL6oyJsOmx_fPbky-xx2YXanrCRdd5_PXH1_-AqFZuuSvgF3Z8IkNdqwAgu1vUL34xDNETlbBd6pJd-UAe2Bpg";
    localStorage.setItem('access_token',userJwt);
    localStorage.setItem('refresh_token',userJwt);

    service.checkForToken();
    expect(navigateSpy).toHaveBeenCalledWith(['registered']);
  })


  it('should go to driver page if token is drivers and not expired', ()=>{
    const navigateSpy = spyOn(router, 'navigate');

    const driverJwt = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlcmRlbGppbWFya29AZ21haWwuY29tIiwicm9sZSI6IkRSSVZFUiIsImlkIjo1LCJleHAiOjMwMDAwMDAwMDAsImlhdCI6MTY3NTc5OTEwN30.EI67xUKrWFYHEl6voX0V5CW364LJgc3hWpcLpPc1U5ckrJgelCVqq_D1JSzZgRZYScVP0Ts1qsc2IBuEk2ifgw";
    localStorage.setItem('access_token',driverJwt);
    localStorage.setItem('refresh_token',driverJwt);

    service.checkForToken();
    expect(navigateSpy).toHaveBeenCalledWith(['driver']);
  })


  it('should go to admin page if token is admins and not expired', ()=>{
    const navigateSpy = spyOn(router, 'navigate');

    const adminJwt = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpZCI6MywiZXhwIjozMDAwMDAwMDAwLCJpYXQiOjE2NzU3OTkxNzF9.gn564MFNz2iwsztRS4EpuWlG10axbDGvf7pzqadOrprD0xpqMZawlbU0xxv3uPV9IhR6IcnU2O31K78L1fXguA";
    localStorage.setItem('access_token',adminJwt);
    localStorage.setItem('refresh_token',adminJwt);

    service.checkForToken();
    expect(navigateSpy).toHaveBeenCalledWith(['admin']);
  })


  it('should stay on login, token is expired', ()=>{
    const navigateSpy = spyOn(router, 'navigate');

    const adminJwt = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpZCI6MywiZXhwIjoxMDAwMDAwMDAxLCJpYXQiOjEwMDAwMDAwMDB9.0nTRZsc4kQ1krn2NUtQF6mPAytDtQBy08tgqLl1O5MKUwVe0YhnwtSW3FIeYjENkFge_nEdlbp3y2LZavb9Jnw";
    localStorage.setItem('access_token',adminJwt);
    localStorage.setItem('refresh_token',adminJwt);

    service.checkForToken();
    expect(navigateSpy).toHaveBeenCalledWith(['login']);
  })


  it('should stay on same page if token is incorrect', ()=>{
    const locationCurrent = location;
    service.checkForToken();
    expect(location).toBe(locationCurrent);  
  })
});
