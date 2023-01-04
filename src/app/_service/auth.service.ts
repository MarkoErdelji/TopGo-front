import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Md5 } from 'ts-md5';
import { RegisterData } from '../components/register/RegisterDTO';
import {DriverInfoDTO} from "../modules/DTO/DriverInfoDTO";
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  errorMsg: string | undefined;
  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};


  constructor(private http: HttpClient, public router: Router) {}
  // Sign-in

  async signIn(username:string|null,password:string|null) {
    const email = username;
    const headers = { 'content-type': 'application/json'}
    const res = await this.http
      .post<any>(`${this.endpoint}/user/login`, JSON.stringify({email,password}),{'headers':headers,observe: 'response',
      responseType: 'json'}).pipe(
        catchError((error:HttpErrorResponse) => {
          return of(error);
        }
        )
      ).subscribe((res: any) => {
        if(res.status == 200){
          localStorage.setItem('access_token', res.body.accessToken);
          localStorage.setItem('refresh_token',res.body.refreshToken);
          this.checkForToken();
        }
        if(res.status == 400){
          window.alert(res.error.message);

        }
      });
    return res;


  }
  getToken() {
    return localStorage.getItem('access_token');
  }

  async register(regData:RegisterData){
    this.http
      .post<any>(`http://localhost:8000/api/passenger`, JSON.stringify(regData), { 'headers': this.headers,observe: 'response',
      responseType: 'json'})
      .pipe(
        catchError((error:HttpErrorResponse) => {
          return of(error);
        }
        )
      ).subscribe(
        response =>{
          if(response.status == 409){
            window.alert("Error: email already exists!");
          }
          else{
            this.router.navigate(['login']);
          }
          return response;
        }
      )

  }
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }


  static doLogout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  checkForToken(){
    const JWTtoken: string = localStorage.getItem("access_token") || '';

   if (JWTtoken == ''){
    return;
   }

   const helper = new JwtHelperService();

   const decodedToken = helper.decodeToken(JWTtoken);

   const expirationDate = helper.getTokenExpirationDate(JWTtoken);
   const isExpired = helper.isTokenExpired(JWTtoken);

   if (isExpired){
    window.alert("Your token has expired,please log in again");
    this.router.navigate(['login'])
    return;
   }

   const role = decodedToken.role;
   switch(role){
    case "DRIVER":
      this.router.navigate(['driver'])
      break;
    case "USER":
      this.router.navigate(['registered'])
      break;
    case "ADMIN":
      this.router.navigate(['admin'])
      break;
   }
  }

  changeUserPassword(userId,newPassword,oldPassword){
    let passwordObject = {new_password:newPassword,old_password:oldPassword}
    return this.http
      .put<any>(`http://localhost:8000/api/user/`+userId+'/changePassword', JSON.stringify(passwordObject), { 'headers': this.headers,
      observe: 'response',
      responseType: 'json'})
  }

  getEmail(){
    const JWTtoken: string = localStorage.getItem("access_token") || '';
    const helper = new JwtHelperService();

    const decodedToken = helper.decodeToken(JWTtoken);
    return decodedToken.sub;
  }
  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

}
