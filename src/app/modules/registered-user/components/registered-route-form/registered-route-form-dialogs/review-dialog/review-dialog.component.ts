import {Component, Inject, OnInit} from '@angular/core';
import {RideService} from "../../../../../service/ride.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RejectionTextDTO} from "../../../../../DTO/RejectionTextDTO";
import {CreateRideDTO} from "../../../../../DTO/CreateRideDTO";
import {CreateReviewDTO} from "../../../../../DTO/CreateReviewDTO";

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent implements OnInit {

  msgCar: any ="";
  msgDriver: any="";
  carRating:number=1;
  driverRating:number=1;

  constructor(
    private rideservice:RideService,
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public stars: boolean[] = Array(5).fill(false);
  public starsDriver: boolean[] = Array(5).fill(false);

  public rateCar(rating: number) {
    this.carRating = rating;
    this.stars = this.stars.map((_, i) => rating > i);

  }
  public rateDriver(rating: number) {
    this.driverRating = rating;
    this.starsDriver = this.starsDriver.map((_, i) => rating > i);

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

  onSendClick() {
    let ret:CreateReviewDTO[] = [];
    let driverRev:CreateReviewDTO =
      {
        rating:this.driverRating,
        comment:this.msgDriver
      }
    let carRev:CreateReviewDTO =
      {
        rating:this.carRating,
        comment:this.msgCar
      }
      ret.push(driverRev);
      ret.push(carRev);
      this.dialogRef.close(ret);

  }
}
