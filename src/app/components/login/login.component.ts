import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_service/auth.service';
import { ForgotPasswordComponent } from './password-reset/forgot-password/forgot-password.component';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { RideNotificationComponent } from '../dialogs/ride-notification/ride-notification.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required])
  });

  email?:string;

  constructor(private router: Router,public authService: AuthService,private dialog:MatDialog) { }

  ngOnInit(): void {

  }


  async create()
  {
    if (this.loginForm.valid) {
      this.authService.signIn(this.loginForm.controls.username.value, this.loginForm.controls.password.value).pipe(
        catchError((error:HttpErrorResponse) => {
          if(error.status == 400){
            console.log(error)
            const dialogRef = this.dialog.open(RideNotificationComponent, {
              id:'validation-error-dialog',
              width: '250px',
              data: {msg:error.error.message
              }
            });
  
          }
          return of(error);
        }
        )
      ).subscribe((res: any) => {
        if(res.status == 200){
          localStorage.setItem('access_token', res.body.accessToken);
          localStorage.setItem('refresh_token',res.body.refreshToken);
          this.authService.checkForToken();
        }
      });;

    }
  }




}
