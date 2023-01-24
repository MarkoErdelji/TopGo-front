import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { RideNotificationComponent } from 'src/app/components/dialogs/ride-notification/ride-notification.component';
import { PasswordResetService } from 'src/app/_service/password-reset.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token!: string;
  userId!:string;

  resetPassForm = new FormGroup({
    passwordControl: new FormControl("",[Validators.required,Validators.minLength(6)]),
    confirmPasswordControl: new FormControl("",[Validators.required,Validators.minLength(6)])
  });


  doPasswordsMatch() {
    const password = this.resetPassForm.controls.passwordControl.value;
    const confirmPassword = this.resetPassForm.controls.confirmPasswordControl.value;
    if (password !== confirmPassword) {
      return false;
    }
    return true;
  }
  
  constructor(private dialog:MatDialog,private route: ActivatedRoute,private passwordResetService:PasswordResetService,private router:Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.userId = params['id'];
    });

  }

  resetPassword(){
    if(this.resetPassForm.valid && this.doPasswordsMatch()){
      this.passwordResetService.resetPassword(this.token,this.userId,this.resetPassForm.controls.passwordControl.value!)
      .pipe(
        catchError((error:HttpErrorResponse) => {
          if(error.status == 400){
            const dialogRef = this.dialog.open(RideNotificationComponent, {
              width: '250px',
              data: {msg: error.message}
            });
            this.router.navigate(['login']);
          }
          if(error.status == 404){
            const dialogRef = this.dialog.open(RideNotificationComponent, {
              width: '250px',
              data: {msg: error.message}
            });
            this.router.navigate(['login']);
          }
          return of(null);
        }
        )
      ).subscribe(
        response=>{
          if(response?.status == 204){
            const dialogRef = this.dialog.open(RideNotificationComponent, {
              width: '250px',
              data: {msg:"Password successfuly reset!"}
            });
            this.router.navigate(['login']);
          }
        }

      )
    }

  }

}
