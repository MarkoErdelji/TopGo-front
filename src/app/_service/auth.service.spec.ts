import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JWTTokenDTO } from '../modules/DTO/JWTTokenDTO';

describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;
  let router: Router;
  let dialog: MatDialog;

  let url = 'localhost:8080/api/user';

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
    httpController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    dialog = TestBed.inject(MatDialog);
  });

  afterEach(() => {
    httpController.verify();
  });

  describe('signIn', () => {
    it('should return a token upon successful login', () => {
      const email = 'test@example.com';
      const password = 'password';
      let jwtDTO: JWTTokenDTO = {accessToken: '123456', refreshToken: '67890'};

      service.signIn(email, password).subscribe((res) => {
        expect(res).toEqual(jwtDTO);
      });

      let tokenResponse = httpController.expectOne({
        method: 'POST',
        url: `${url}/login`,
      });
      tokenResponse.flush(jwtDTO);
    });
  });
});