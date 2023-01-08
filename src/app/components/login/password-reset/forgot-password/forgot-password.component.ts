import { Component, Input, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { htmlEmail } from '.././email-template';
import { PasswordResetService } from '../../../../_service/password-reset.service';
import { UserService } from 'src/app/_service/user.service';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  resetPassForm = new FormGroup({
    emailControl: new FormControl("",[Validators.required,Validators.email])
  }
  );
  
  constructor(private passwordResetService:PasswordResetService,private userService:UserService,private router:Router) { }

  ngOnInit(): void {
  
  }

  resetPassword(){
    if (this.resetPassForm.valid){
      this.userService.getUserByEmail(this.resetPassForm.controls.emailControl.value!).pipe(
        catchError((error:HttpErrorResponse) => {
          if(error.status == 404){
            window.alert("User does not exist!")
          }
          return of(null);
        }
        )
      ).subscribe(res=>{
        if(res != null){
          this.passwordResetService.sendEmail(res.body.id).pipe(
            catchError((error:HttpErrorResponse) => {
              if(error.status == 404){
                window.alert("User does not exist!")
              }
              return of(null);
            }
            )
          ).subscribe(response=>{
            if(response!.status == 204){
              window.alert(	'Email with reset code has been sent!')
              this.router.navigate(['login']);
            }
          });
        }
      })
    
    }
  }
}
