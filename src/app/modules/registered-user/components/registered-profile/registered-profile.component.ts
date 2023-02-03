import { Component, OnInit } from '@angular/core';
import {RegisteredService} from "../../../service/registered.service";
import {DistanceAndAverageDTO} from "../../../DTO/DistanceAndAverageDTO";
import {PassengerInfoDTO} from "../../../DTO/PassengerInfoDTO";
import {MatDialog} from "@angular/material/dialog";
import {
  EditProfileDialogComponent
} from "./registered-profile-dialogs/edit-profile-dialog/edit-profile-dialog.component";
import {RideDTO} from "../../../DTO/RideDTO";
import {RideService} from "../../../service/ride.service";
import {AuthService} from "../../../../_service/auth.service";
import {
  ChangePasswordDialogComponent
} from "./registered-profile-dialogs/change-password-dialog/change-password-dialog.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registered-profile',
  templateUrl: './registered-profile.component.html',
  styleUrls: ['./registered-profile.component.css']
})
export class RegisteredProfileComponent implements OnInit {
  firstName: any;
  lastName: any;
  username: any;
  address: any;
  phone: any;
  pfp: any;
  user?:PassengerInfoDTO;
  rides:RideDTO[] = [];

  private subscriptions: Subscription[] = [];


  constructor(public dialog: MatDialog,private passengerService:RegisteredService,private authService:AuthService) { }

  ngOnInit(): void {
    this.subscriptions.push(this.passengerService.getPassengerRides(this.authService.getUserId(),0,9000,null,null).subscribe(res =>
      {
        this.rides = res.body?.results!
        console.log(this.rides)

      }))
    this.subscriptions.push(this.passengerService.getPassengerById(this.passengerService.id || 0).subscribe(passenger =>
    {
      console.log(passenger)
      this.user = passenger;
      this.firstName =passenger.name;
      this.lastName = passenger.surname;
      this.username = passenger.email;
      this.address = passenger.address;
      this.pfp = passenger.profilePicture;
      this.phone = passenger.telephoneNumber;
    }));

  }
  openPasswordDialog() :void
{
  const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
    data: {}
  });

}
  openDialog(): void {
    let msg = ''
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      data: {passenger: this.user}
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.passengerService.editProfile(this.user?.id,result).subscribe(res=>
        {
          this.user = res.body!;
          this.firstName =res.body!.name!;
          this.lastName = res.body!.surname;
          this.username = res.body!.email;
          this.address = res.body!.address;
          this.pfp = res.body!.profilePicture;
          this.phone = res.body!.telephoneNumber;
        })
      }
    }));

  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription=>subscription.unsubscribe());
  }
}