import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {catchError, first, map, of, Subscription} from 'rxjs';
import { RideNotificationComponent } from 'src/app/components/dialogs/ride-notification/ride-notification.component';
import { DriverInfoDTO } from 'src/app/modules/DTO/DriverInfoDTO';
import { DriverService } from 'src/app/modules/service/driver.service';
import { ProfileChangesRequestService } from 'src/app/modules/service/profile-changes-request.service';
import { AuthService } from 'src/app/_service/auth.service';
import { DriverChangeImageDialogComponent } from '../driver-profile-dialogs/driver-change-image-dialog/driver-change-image-dialog.component';
import { DriverChangePasswordDialogComponent } from '../driver-profile-dialogs/driver-change-password-dialog/driver-change-password-dialog.component';

@Component({
  selector: 'app-driver-profile-edit',
  templateUrl: './driver-profile-edit.component.html',
  styleUrls: ['./driver-profile-edit.component.css']
})
export class DriverProfileEditComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  editForm = new FormGroup({
    firstName: new FormControl("",[Validators.required,Validators.pattern(/^\p{Lu}[\p{L}]*/u)]),
    lastName: new FormControl("",[Validators.required,Validators.pattern(/^\p{Lu}[\p{L}]*/u)]),
    email: new FormControl("",[Validators.required,Validators.email]),
    phoneNumber: new FormControl("",[Validators.required,Validators.pattern('^[0-9+].{8,11}$')]),
    adress: new FormControl("",[Validators.required,Validators.pattern(/[\p{L}\p{N} ,]*/gu)])
  });

  newPassword!:string | null

  imageUrl?:string
  constructor(private driverService:DriverService,private dialog:MatDialog,private profileRequestService:ProfileChangesRequestService,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.subscriptions.push(
    this.driverService.getDriverById(this.driverService.id!).pipe(
      map(data => {
        if (data) {
          return data as DriverInfoDTO;
        }
        return;
      })
      ).subscribe(response=>{
        this.imageUrl = response?.profilePicture;
        this.editForm.patchValue({
          firstName:response!.name,
          lastName:response!.surname,
          email:response!.email,
          phoneNumber:response!.telephoneNumber,
          adress:response!.address
        })
    }))
  }



  changePassword(){
    this.dialog.open(DriverChangePasswordDialogComponent,{ panelClass: 'custom-dialog-container' });
  }
  sendEditRequest(){
    if(this.editForm.valid){


    let data:DriverInfoDTO={
      id: this.driverService.id!,
      name: this.editForm.controls.firstName.value!,
      surname: this.editForm.controls.lastName.value!,
      email: this.editForm.controls.email.value!,
      telephoneNumber: this.editForm.controls.phoneNumber.value!,
      profilePicture: this.imageUrl!,
      address: this.editForm.controls.adress.value!
    }
    this.subscriptions.push(
    this.profileRequestService.postChangeRequest(data).pipe(
      catchError((error:HttpErrorResponse) => {
        return of(error);
      }
      )
    ).subscribe(
      response =>{
        if(response.status == 404){
          const dialogRef = this.dialog.open(RideNotificationComponent, {
            width: '250px',
            data: {msg:"Error while sending data!"}
          });
        }
        else if(response. status == 201){
          const dialogRef = this.dialog.open(RideNotificationComponent, {
            width: '250px',
            data: {msg:"Request for changes successfuly sent!"}
          });
          this.router.navigate(['driver/profile'])
        }
      }
    ))
  }}

  updateImage(imageUrl: string) {
    this.imageUrl = imageUrl;
  }
  changeImage(){
    let dialogRef = this.dialog.open(DriverChangeImageDialogComponent,{ panelClass: 'custom-dialog-container' });
    dialogRef?.afterClosed().subscribe(result=>{
      console.log(result);
      if (result != undefined) {
        this.updateImage(result);
      }
    })
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      console.log(subscription)
      subscription.unsubscribe()});
  }

}
