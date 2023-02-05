import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../../../../service/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SendMessageDTO} from "../../../../../DTO/SendMessageDTO";
import {RideService} from "../../../../../service/ride.service";
import {RejectionTextDTO} from "../../../../../DTO/RejectionTextDTO";

@Component({
  selector: 'app-panic-dialog',
  templateUrl: './panic-dialog.component.html',
  styleUrls: ['./panic-dialog.component.css']
})
export class PanicDialogComponent implements OnInit {

  msg: any;

  constructor(
    private rideservice:RideService,
    public dialogRef: MatDialogRef<PanicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

  onSendClick() {
    let rejection:RejectionTextDTO = {
      reason: this.msg,
    }
    this.rideservice.panic(this.data.ride!.id,rejection).subscribe(response =>{
      this.dialogRef.close(response);

    })
  }
}
