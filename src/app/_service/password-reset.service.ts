import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  sendEmail(userId: any) {
    return this.http.get<any>('http://localhost:8000/api/user/' +userId+'/resetPassword',{

    observe: 'response',
    responseType: 'json'
  })
  }

  constructor(private http: HttpClient,private router:Router) {}

  private headers = { 'content-type': 'application/json'}  



  resetPassword(token:string,userId,newPassword:string){
    let body = {code:token,
          newPassword:newPassword};
    return this.http.put<any>('http://localhost:8000/api/user/' +userId+'/resetPassword',body,{

    observe: 'response',
    responseType: 'json'
  })
  }

}
