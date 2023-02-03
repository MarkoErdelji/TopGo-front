import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SendMessageDTO} from "../../../DTO/SendMessageDTO";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-driver-chat',
  templateUrl: './driver-chat.component.html',
  styleUrls: ['./driver-chat.component.css']
})
export class DriverChatComponent implements OnInit {

  msg: any;
  private subscriptions: Subscription[] = [];

  constructor(
    private userService:UserService,
    public dialogRef: MatDialogRef<DriverChatComponent>,
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

    for(let user of this.data.ride?.passengers){
      this.subscriptions.push(
      this.userService.sendMessage(user.id,message).subscribe(response =>{})
      )
    }

  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      console.log(subscription)
      subscription.unsubscribe()});
  }

}
