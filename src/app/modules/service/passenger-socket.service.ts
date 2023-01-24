import { Injectable, TemplateRef } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { RideDTO } from '../DTO/RideDTO';
import {BehaviorSubject} from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChatDialogComponent
} from "../registered-user/components/registered-route-form/registered-route-form-dialogs/chat-dialog/chat-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {
  RideNotificationComponent
} from "../registered-user/components/dialogs/ride-notification/ride-notification.component";
import {InviteFriendDTO} from "../DTO/InviteFriendDTO";
import { GeoLocationDTO } from '../DTO/GeoLocationDTO';
import { RouteFormService } from './route-form.service';
import {DriverNotificationsComponent} from "../driver/components/driver-notifications/driver-notifications.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  FriendInviteDialogComponent
} from "../registered-user/components/dialogs/friend-invite-dialog/friend-invite-dialog.component";


@Injectable({
  providedIn: 'root'
})
export class PassengerSocketService {

  notificationDisplayed: boolean = false;
  notificationQueue: RideDTO[] = [];

  constructor(private snackBar:MatSnackBar,public dialog: MatDialog,private routeService:RouteFormService ) {}

  public stompClient;
  public msg:any = [];

  initializeWebSocketConnection(passengerId) {
    const serverUrl = 'http://localhost:8000/ws';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function() {
      that.openSocket(passengerId);
      that.openNotificationSocket(passengerId);
      that.openInvitesSocket(passengerId);
      that.openVehicleLocationSocket(passengerId);
    });
  }
  initializeWebSocketConnectionFriendResponse(passengerId) {
    const serverUrl = 'http://localhost:8000/ws';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function() {
      that.openSocketFriendResponse(passengerId);

    });
  }
  openSocketFriendResponse(passengerId)
  {
    this.stompClient.subscribe('/topic/passenger/response/'+passengerId, (message) => {
      try{
        const res: InviteFriendDTO = JSON.parse(message.body);
        console.log(res)
        this.setResponse(res);

      }
      catch{
        const error:String = message.body;
        console.log(error);
        this.setReturnError(error);
      }
    });

  }
  private returnResponse$ = new BehaviorSubject<any>({});
  selectResponse$ = this.returnResponse$.asObservable();
  setResponse(response: InviteFriendDTO) {
    this.returnResponse$.next(response);
  }
  openInvitesSocket(passengerId)
  {
    this.stompClient.subscribe('/topic/passenger/invites/'+passengerId, (message) => {
      try{
        const inv: InviteFriendDTO = JSON.parse(message.body);
        this.displayInvite(inv);

      }
      catch{
        const error:String = message.body;
        console.log(error);
        this.setReturnError(error);
      }
    });

  }

  openSocket(passengerId){
    this.stompClient.subscribe('/topic/passenger/ride/'+passengerId, (message) => {
      try{
      const ride: RideDTO = JSON.parse(message.body);
      console.log(ride);
      this.setReturnRide(ride);
      this.openDialog(ride.status);
      }
      catch{
        const error:String = message.body;
        console.log(error);
        this.setReturnError(error);
      }
    });
  }

  openNotificationSocket(passengerId){
    this.stompClient.subscribe('/topic/passenger/scheduledNotification/'+passengerId, (message) => {
      try{
      const notification: string = message.body
      console.log(notification);
      this.setReturnNotification(notification);
      }
      catch{
        const error:String = message.body;
        console.log(error);
        this.setReturnError(error);
      }
    });
  }

  openVehicleLocationSocket(passengerId){
    this.stompClient.subscribe('/topic/vehicleLocation/ride/user/'+passengerId, (message) => {
      try{
        const geoLocation: GeoLocationDTO = JSON.parse(message.body);
        console.log(geoLocation);
        this.routeService.changeMarkerLocation(geoLocation);        }
        catch{
          console.log(message)
          return;
        }
    });
  }



  private returnRide$ = new BehaviorSubject<any>({});
  selectReturnRide$ = this.returnRide$.asObservable();
  setReturnRide(ride: RideDTO) {
    this.returnRide$.next(ride);
  }



  private returnNotification$ = new BehaviorSubject<any>({});
  selectReturnNotification$ = this.returnNotification$.asObservable();
  setReturnNotification(notification: string) {
    this.returnNotification$.next(notification);
  }


  private returnError$ = new BehaviorSubject<any>({});
  selectReturnError$ = this.returnError$.asObservable();
  setReturnError(error: String) {
    this.returnError$.next(error);
  }


  sendMessage(message) {
    this.stompClient.send('/app/send' , {}, message);
  }
  openDialog(message:string): void {
    let msg = ''
    if (message == "ACCEPTED")
    {
      msg = "Your Ride Was Accepted!"
    }
    if (message == "CANCELED")
    {
      msg = "Your Ride Was Canceled!"
    }
    if (message == "REJECTED")
    {
      msg = "Your Ride Was Rejected!"
    }
    if (message == "ACTIVE")
    {
      msg = "Your Is Started!"
    }
    const dialogRef = this.dialog.open(RideNotificationComponent, {
      width: '250px',
      data: {msg: msg}
    });

  }
  displayInvite(inv: InviteFriendDTO) {
    this.notificationDisplayed = true;
    this.snackBar.openFromComponent(FriendInviteDialogComponent, {
      data: {inv,
        duration: 60000,snackBarRef: this.snackBar},
      verticalPosition: 'top',
      panelClass:".custom-snack-bar"

    })
  };

}
