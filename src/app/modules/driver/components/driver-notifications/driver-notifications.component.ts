import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ComponentRef, Inject, Input, OnInit, ViewChild, ViewRef } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { catchError, of, Subscription, timer } from 'rxjs';
import { PassengerInfoDTO } from 'src/app/modules/DTO/PassengerInfoDTO';
import { RideDTO } from 'src/app/modules/DTO/RideDTO';
import { RegisteredService } from 'src/app/modules/service/registered.service';
import { RideService } from 'src/app/modules/service/ride.service';
import { UserService } from 'src/app/_service/user.service';
import {RejectionTextDTO} from "../../../DTO/RejectionTextDTO";

@Component({
  selector: 'app-driver-notifications',
  templateUrl: './driver-notifications.component.html',
  styleUrls: ['./driver-notifications.component.css']
})
export class DriverNotificationsComponent implements OnInit,AfterViewInit {

  @Input() ride!:RideDTO
  secondsLeft!: number;
  passengerUsernameProfile?:any[];
  timerSubscription!: Subscription;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,private rideService:RideService,private userService:UserService) {}

  ngOnInit(): void {
    this.ride = this.data.ride;
    this.ride.totalCost = Math.floor(this.ride.totalCost*100)/100;
    this.ride.estimatedTimeInMinutes = Math.floor(this.ride.estimatedTimeInMinutes*100)/100;
    this.secondsLeft = this.data.duration /1000;
    this.startTimer();
  }

  ngAfterViewInit(): void {
    this.passengerUsernameProfile = []
    this.ride.passengers.forEach((passenger)=>{
      let instance = {
        email: '',
        profilePicture: ''
      }
      this.userService.getUserById(passenger.id).subscribe(result=>{
        console.log(result);
        instance.email =result.body!.email
        instance.profilePicture = result!.body!.profilePicture
        console.log(instance);
        this.passengerUsernameProfile!.push(instance)
        console.log(this.passengerUsernameProfile)}
      )
    })
  }
  startTimer() {
    const timer$ = timer(0, 1000);
    this.timerSubscription = timer$.subscribe(() => {
      this.secondsLeft--;
      if (this.secondsLeft === 0) {
        this.data.snackBarRef.dismiss();
      }
    });
  }

  ngOnDestroy() {
    this.timerSubscription.unsubscribe();
  }


  onAccept() {
  this.rideService.acceptRide(this.ride.id).pipe(
      catchError((error:HttpErrorResponse) => {
        if(error.status == 400){
          window.alert(error.error.message);
          this.data.snackBarRef.dismiss();
        }
        if(error.status == 404){
          window.alert(error.error.message);
          this.data.snackBarRef.dismiss();
        }
        return of(null)
      }
      )
    ).subscribe((res: any) => {
      if(res != null){
        this.rideService.simulateRide(this.ride.id).subscribe(res=>{
          console.log(res);
        })
        console.log(res);
        this.data.snackBarRef.dismiss();
      }
    });
  }
  onDecline() {
    let rejectionTextDTO:RejectionTextDTO = {
      reason:"Placeholder"
    }
    this.rideService.declineRide(this.ride.id, rejectionTextDTO).pipe(
      catchError((error:HttpErrorResponse) => {
        if(error.status == 400){
          window.alert(error.error.message);
          this.data.snackBarRef.dismiss();
        }
        if(error.status == 404){
          window.alert(error.error.message);
          this.data.snackBarRef.dismiss();
        }
        return of(null)
      }
      )
    ).subscribe((res: any) => {
      if(res != null){
        this.data.snackBarRef.dismiss();
      }
    });
    }
}
