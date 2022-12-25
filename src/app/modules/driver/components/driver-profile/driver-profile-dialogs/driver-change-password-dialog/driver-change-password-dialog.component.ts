import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DriverService } from 'src/app/modules/service/driver.service';

@Component({
  selector: 'app-driver-change-password-dialog',
  templateUrl: './driver-change-password-dialog.component.html',
  styleUrls: ['./driver-change-password-dialog.component.css']
})
export class DriverChangePasswordDialogComponent implements OnInit {

  changePassForm = new FormGroup({
    passwordControl: new FormControl("",[Validators.required,Validators.minLength(6)]),
    confirmPasswordControl: new FormControl("",[Validators.required,Validators.minLength(6)])
  });
  
  constructor(private driverService:DriverService,private dialogRef: MatDialogRef<DriverChangePasswordDialogComponent>) { }

  ngOnInit(): void {
  }


  doPasswordsMatch() {
    const password = this.changePassForm.controls.passwordControl.value;
    const confirmPassword = this.changePassForm.controls.confirmPasswordControl.value;
    if (password !== confirmPassword) {
      return false;
    } 
    return true;
  }

  changeDriverPassword(){
      if(this.changePassForm.valid && this.doPasswordsMatch()){
        this.dialogRef.close();
      }
  }


}
