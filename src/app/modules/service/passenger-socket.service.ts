import { Injectable, TemplateRef } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { RideDTO } from '../DTO/RideDTO';
import {BehaviorSubject} from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PassengerSocketService {

  notificationDisplayed: boolean = false;
  notificationQueue: RideDTO[] = [];

  constructor( ) {}

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
    });
  }

  openSocket(passengerId){
    this.stompClient.subscribe('/topic/passenger/ride/'+passengerId, (message) => {
      try{
      const ride: RideDTO = JSON.parse(message.body);
      console.log(ride);
      this.setReturnRide(ride);
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
}
