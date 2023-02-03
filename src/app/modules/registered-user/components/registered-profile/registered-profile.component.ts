import { Component, OnDestroy, OnInit } from '@angular/core';
import {RegisteredService} from "../../../service/registered.service";
import {DistanceAndAverageDTO} from "../../../DTO/DistanceAndAverageDTO";
import {PassengerInfoDTO} from "../../../DTO/PassengerInfoDTO";
import {MatDialog} from "@angular/material/dialog";
import {
  EditProfileDialogComponent
} from "./registered-profile-dialogs/edit-profile-dialog/edit-profile-dialog.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registered-profile',
  templateUrl: './registered-profile.component.html',
  styleUrls: ['./registered-profile.component.css']
})
export class RegisteredProfileComponent implements OnInit,OnDestroy {
  firstName: any;
  lastName: any;
  username: any;
  address: any;
  phone: any;
  pfp: any;
  user?:PassengerInfoDTO;
  private subscriptions: Subscription[] = [];

  constructor(public dialog: MatDialog,private passengerService:RegisteredService) { }

  ngOnInit(): void {
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

  openDialog(): void {
    let msg = ''
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      data: {passenger: this.user}
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.subscriptions.push(this.passengerService.editProfile(this.user?.id,result).subscribe(res=>
        {
          this.user = res.body!;
          this.firstName =res.body!.name!;
          this.lastName = res.body!.surname;
          this.username = res.body!.email;
          this.address = res.body!.address;
          this.pfp = res.body!.profilePicture;
          this.phone = res.body!.telephoneNumber;
        }))
      }
    }));

  }

  ngOnDestroy(){
    this.subscriptions.forEach(subscription=>subscription.unsubscribe());
  }
}
