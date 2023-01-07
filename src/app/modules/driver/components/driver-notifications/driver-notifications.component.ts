import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentRef, Inject, Input, OnInit, ViewChild, ViewRef } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { catchError, of, Subscription, timer } from 'rxjs';
import { RideDTO } from 'src/app/modules/DTO/RideDTO';
import { RideService } from 'src/app/modules/service/ride.service';

@Component({
  selector: 'app-driver-notifications',
  templateUrl: './driver-notifications.component.html',
  styleUrls: ['./driver-notifications.component.css']
})
export class DriverNotificationsComponent implements OnInit {

  @Input() ride!:RideDTO
  secondsLeft!: number;
  timerSubscription!: Subscription;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,private rideService:RideService) {}

  ngOnInit(): void {
    this.ride = this.data.ride;
    this.secondsLeft = this.data.duration / 1000;
    this.startTimer();
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
        console.log(res);
        this.data.snackBarRef.dismiss();
      }
    });
  }
  onDecline() {
    this.data.snackBarRef.dismiss();
  }
}