import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, first, map, of } from 'rxjs';
import { DriverInfoDTO } from 'src/app/modules/DTO/DriverInfoDTO';
import { DriverService } from 'src/app/modules/service/driver.service';
import { ProfileChangesRequestService } from 'src/app/modules/service/profile-changes-request.service';
import { AuthService } from 'src/app/_service/auth.service';
import { DriverChangePasswordDialogComponent } from '../driver-profile-dialogs/driver-change-password-dialog/driver-change-password-dialog.component';

@Component({
  selector: 'app-driver-profile-edit',
  templateUrl: './driver-profile-edit.component.html',
  styleUrls: ['./driver-profile-edit.component.css']
})
export class DriverProfileEditComponent implements OnInit {

  editForm = new FormGroup({
    firstName: new FormControl("",[Validators.required,Validators.pattern(/^\p{Lu}[\p{L}]*/gu)]),
    lastName: new FormControl("",[Validators.required,Validators.pattern(/^\p{Lu}[\p{L}]*/gu)]),
    email: new FormControl("",[Validators.required,Validators.email]),
    phoneNumber: new FormControl("",[Validators.required,Validators.pattern('^[0-9+].{8,11}$')]),
    adress: new FormControl("",[Validators.required,Validators.pattern(/[\p{L}\p{N} ,]*/gu)])
  });

  newPassword!:string | null

  imageUrl?:string
  constructor(private driverService:DriverService,private dialog:MatDialog,private profileRequestService:ProfileChangesRequestService,private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.driverService.getImageUrl().subscribe(url => this.imageUrl = url)

    this.driverService.getDriverById(this.driverService.id!).pipe(
      map(data => {
        if (data) {
          return data as DriverInfoDTO;
        }
        return;
      })
      ).subscribe(response=>{
        this.editForm.patchValue({
          firstName:response!.name,
          lastName:response!.surname,
          email:response!.email,
          phoneNumber:response!.telephoneNumber,
          adress:response!.address
        })
    })
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
    
    this.profileRequestService.postChangeRequest(data).pipe(
      catchError((error:HttpErrorResponse) => {
        return of(error);
      }
      )
    ).subscribe(
      response =>{
        if(response.status == 404){
          window.alert("Error while sending data!");
        }
        else if(response. status == 201){
          window.alert("Request for changes successfuly sent!");
          this.router.navigate(['driver/profile'])
        }
      }
    )
  }}
}
