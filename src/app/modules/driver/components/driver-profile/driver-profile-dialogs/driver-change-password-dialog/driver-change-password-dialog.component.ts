import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { catchError, of } from 'rxjs';
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
  
  constructor(private driverService:DriverService,private dialogRef: MatDialogRef<DriverChangePasswordDialogComponent>,private authService:AuthService) { }

  ngOnInit(): void {
  }


  changeDriverPassword(){
      if(this.changePassForm.valid){
        this.authService.changeUserPassword(this.driverService.id,this.changePassForm.controls.newPasswordControl.value,this.changePassForm.controls.oldPasswordControl.value)
        .pipe(
          catchError((error:HttpErrorResponse) => {
            return of(error);
          }
          )
        ).subscribe(
          response=>{
            if(response.status == 204){
              window.alert("Password successfuly changed");
              this.dialogRef.close();
            }
            else if(response.status == 400){
              window.alert("Please enter the correct old password!");
            }
            else if (response.status == 404){
              window.alert("No such user exists!")
            }
          }
        )
      }
  }


}
