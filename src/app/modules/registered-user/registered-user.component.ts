import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {catchError, map, of, Subscription} from "rxjs";
import {DriverInfoDTO} from "../DTO/DriverInfoDTO";
import {DriverService} from "../service/driver.service";
import {UserService} from "../../_service/user.service";
import {AuthService} from "../../_service/auth.service";
import {RegisteredService} from "../service/registered.service";
import {PassengerInfoDTO} from "../DTO/PassengerInfoDTO";
import { PassengerSocketService } from '../service/passenger-socket.service';
import { RideNotificationComponent } from 'src/app/components/dialogs/ride-notification/ride-notification.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationDialogComponent } from './components/registered-dialogs/notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-registered-user',
  templateUrl: './registered-user.component.html',
  styleUrls: ['./registered-user.component.css']
})
export class RegisteredUserComponent implements OnInit,OnDestroy {
  private passengerInfo? :PassengerInfoDTO;
  private subscriptions: Subscription[] = [];

  constructor(private dialog:MatDialog,private userService:UserService,private passengerService:RegisteredService,private authService:AuthService,private passengerSocketService:PassengerSocketService) { }
  ngOnDestroy(): void {
    this.passengerSocketService.stompClient.disconnect();
    this.subscriptions.forEach(subscription=>subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(this.userService.getUserByEmail(this.authService.getEmail()).subscribe(
      response=>{
        if(response.status == 200){
          this.subscriptions.push(this.passengerService.getPassengerById(response.body.id).pipe(
            catchError((error:HttpErrorResponse) => {
                return of(error);
              }
            )
          ).pipe(
            map(data => {
              if (data) {
                return data as DriverInfoDTO;
              }
              return;
            })
          ).
          subscribe(passengerResponse=>
          {
            this.passengerSocketService.initializeWebSocketConnection(this.authService.getUserId());
            this.passengerSocketService.selectReturnNotification$.subscribe({next:(notification:string)=>{
              if(Object.keys(notification).length !== 0){
              const dialogRef = this.dialog.open(NotificationDialogComponent, {
                width: '400px',
                data: {msg:notification},
                position: {top:"0px"}
              });
            }
            }})
            this.passengerInfo = passengerResponse
            this.passengerService.id = passengerResponse?.id;

            console.log(passengerResponse);
          }))
        }
        else{
          const dialogRef = this.dialog.open(RideNotificationComponent, {
            width: '250px',
            data: {msg:"Error: Email no longer in database"}
          });
        }
      }
    ))

  }



}
