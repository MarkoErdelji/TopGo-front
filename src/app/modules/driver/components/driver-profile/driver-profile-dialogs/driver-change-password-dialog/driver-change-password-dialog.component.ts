import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {catchError, of, Subscription} from 'rxjs';
import { RideNotificationComponent } from 'src/app/components/dialogs/ride-notification/ride-notification.component';
import { DriverService } from 'src/app/modules/service/driver.service';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'app-driver-change-password-dialog',
  templateUrl: './driver-change-password-dialog.component.html',
  styleUrls: ['./driver-change-password-dialog.component.css']
})
export class DriverChangePasswordDialogComponent implements OnInit {

  changePassForm = new FormGroup({
    oldPasswordControl: new FormControl(""),
    newPasswordControl: new FormControl("",[Validators.required,Validators.minLength(6)])
  });
  private subscriptions: Subscription[] = [];
  constructor(private dialog:MatDialog,private driverService:DriverService,private dialogRef: MatDialogRef<DriverChangePasswordDialogComponent>,private authService:AuthService) { }

  ngOnInit(): void {
  }


  changeDriverPassword(){
      if(this.changePassForm.valid){
        this.subscriptions.push(
        this.authService.changeUserPassword(this.driverService.id,this.changePassForm.controls.newPasswordControl.value,this.changePassForm.controls.oldPasswordControl.value)
        .pipe(
          catchError((error:HttpErrorResponse) => {
            return of(error);
          }
          )
        ).subscribe(
          response=>{
            if(response.status == 204){
              const dialogRef = this.dialog.open(RideNotificationComponent, {
                width: '350px',
                data: {msg:"Password successfuly changed!"}
              });
              this.dialogRef.close();
            }
            else if(response.status == 400){
              const dialogRef = this.dialog.open(RideNotificationComponent, {
                width: '350px',
                data: {msg:"Please enter the correct old password!"}
              });
            }
            else if (response.status == 404){
              const dialogRef = this.dialog.open(RideNotificationComponent, {
                width: '350px',
                data: {msg:"No such user exists!"}
              });
            }
          }
        ))
      }
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      console.log(subscription)
      subscription.unsubscribe()});
  }


}
