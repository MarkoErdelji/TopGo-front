import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {PassengerInfoDTO} from "../../../../../DTO/PassengerInfoDTO";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../../service/user.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UpdatePassengerDTO} from "../../../../../DTO/UpdatePassengerDTO";
import {ChangePasswordDTO} from "../../../../../DTO/ChangePasswordDTO";
import {AuthService} from "../../../../../../_service/auth.service";
import {catchError} from "rxjs/operators";
import {
  RideNotificationComponent
} from "../../../../../../components/dialogs/ride-notification/ride-notification.component";
import {EMPTY, of} from "rxjs";

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent implements OnInit {

  Message: any;

  pfp?:string;
  editForm = new FormGroup({
    oldPassword: new FormControl("",[Validators.required]),
    newPassword: new FormControl("",[Validators.required]),
  });


  constructor(
    private userService: UserService,
    private authService:AuthService,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private dialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {





  }
  @Output() update: EventEmitter<UpdatePassengerDTO> = new EventEmitter<UpdatePassengerDTO>();
  submit() {


    let changePass: ChangePasswordDTO = {
      newPassword: this.editForm.get("newPassword")?.value!,
      oldPassword: this.editForm.get("oldPassword")?.value!,
    }

    if(this.editForm.valid)

    {
      this.userService.changePassword(this.authService.getUserId(),changePass).pipe(
        catchError((error) => {
          if (error.status === 400) {
            console.log(error)
            this.dialog.open(RideNotificationComponent, {
              width: '250px',
              data: {msg:"Wrong inputs, please try again!"}
            });
          }
          return of(null);
        })
      ).subscribe(res =>
      {
        if (res) {
          this.dialog.open(RideNotificationComponent, {
            width: '250px',
            data: {msg: "Password changed successfully!"}

          });
          this.dialogRef.close();
        }
      })
    }

  }


}
