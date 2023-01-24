import {AfterViewInit, Component, Inject, Input, OnInit} from '@angular/core';
import {RideDTO} from "../../../../DTO/RideDTO";
import {catchError, of, Subscription, timer} from "rxjs";
import {MAT_SNACK_BAR_DATA} from "@angular/material/snack-bar";
import {RideService} from "../../../../service/ride.service";
import {UserService} from "../../../../../_service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {RejectionTextDTO} from "../../../../DTO/RejectionTextDTO";
import {InviteFriendDTO} from "../../../../DTO/InviteFriendDTO";
import {PassengerInfoDTO} from "../../../../DTO/PassengerInfoDTO";
import {RegisteredService} from "../../../../service/registered.service";

@Component({
  selector: 'app-friend-invite-dialog',
  templateUrl: './friend-invite-dialog.component.html',
  styleUrls: ['./friend-invite-dialog.component.css']
})
export class FriendInviteDialogComponent implements OnInit,AfterViewInit {

  @Input() inv!:InviteFriendDTO
  secondsLeft!: number;
  passengerUsernameProfile?:any[];
  timerSubscription!: Subscription;
  user!:PassengerInfoDTO;
  pfp!:string;

  userName!:string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,private rideService:RideService,private userService:UserService,private passengerService:RegisteredService) {}

  ngOnInit(): void {
    this.inv = this.data.inv;
    this.secondsLeft = this.data.duration /1000;
    this.startTimer();
    this.passengerService.getPassengerById(this.inv.userId).subscribe(response =>
    {
      this.user = response;
      this.pfp = this.user.profilePicture;
      this.userName = this.user.name + " " + this.user.surname
    })
  }

  ngAfterViewInit(): void {

  }
  startTimer() {
    const timer$ = timer(0, 1000);
    this.timerSubscription = timer$.subscribe(() => {
      this.secondsLeft--;
      if (this.secondsLeft === 0) {
        this.onDecline();
      }
    });
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }


  onAccept() {
    this.inv.status = "ACCEPTED"


    this.passengerService.inviteRespond(this.inv).subscribe(res=>
    {
      console.log(res)
    })
    this.data.snackBarRef.dismiss();
  }
  onDecline() {
    this.inv.status = "REJECTED"


    this.passengerService.inviteRespond(this.inv).subscribe(res=>
    {
      console.log(res)
    })
    this.data.snackBarRef.dismiss();

  }
}
