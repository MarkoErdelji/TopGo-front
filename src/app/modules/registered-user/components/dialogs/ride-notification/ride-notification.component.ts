import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../../../service/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SendMessageDTO} from "../../../../DTO/SendMessageDTO";

@Component({
  selector: 'app-ride-notification',
  templateUrl: './ride-notification.component.html',
  styleUrls: ['./ride-notification.component.css']
})
export class RideNotificationComponent implements OnInit {

  Message: any;

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<RideNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.Message = this.data.msg;

  }

}
