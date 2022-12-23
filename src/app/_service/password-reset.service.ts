import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid'
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient,private router:Router) {}

  private headers = { 'content-type': 'application/json'}  

  generateToken(){
    return uuidv4();
  }

  sendTokenToDatabase(token: string){
    this.http.post<any>('http://localhost:8000/api/passwordResetToken', JSON.stringify(token),{'headers':this.headers}).pipe(
      catchError((error:HttpErrorResponse) => {
        return of(error);
      }
      )
    ).subscribe(
      response =>{
        if(response.status == 404){
          window.alert("Error: Bad request!");
        }
        else{
          console.log("Token saved");
        }
        return response;
      }
    )

  }
  sendEmail(to:string,subject:string,message:string) {
    const email = {
      to: to,
      subject: subject,
      message: message
    };

    const resetToken = this.generateToken();

    this.sendTokenToDatabase(resetToken);
    email.message = email.message.replace("{{action_url}}","http://localhost:4200/resetpassword?token="+resetToken);
    email.message = email.message.replace("{{action_url}}","http://localhost:4200/resetpassword?token="+resetToken);
    
    this.http.post<any>('http://localhost:8000/api/email', JSON.stringify(email),{'headers':this.headers}).pipe(
      catchError((error:HttpErrorResponse) => {
        return of(error);
      }
      )
    ).subscribe(
      response =>{
        if(response.status == 404){
          window.alert("Error: Bad request!");
        }
        else if(response.status == 200){
          window.alert("Email successfuly sent");
          this.router.navigate(['login'])
        }
      }
    )
  }
}
