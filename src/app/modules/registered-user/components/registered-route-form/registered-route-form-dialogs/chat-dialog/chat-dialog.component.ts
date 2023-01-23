import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {UserService} from "../../../../../service/user.service";
import {RideDTO} from "../../../../../DTO/RideDTO";
import {SendMessageDTO} from "../../../../../DTO/SendMessageDTO";

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {
  msg: any;

  constructor(
    private userService:UserService,
    public dialogRef: MatDialogRef<ChatDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

  onSendClick() {
    let message:SendMessageDTO = {
      message: this.msg,
      type: "RIDE",
      rideId: this.data.ride?.id!
    }
    this.userService.sendMessage(this.data.ride!.driver.id,message).subscribe(response =>{})
  }
}
