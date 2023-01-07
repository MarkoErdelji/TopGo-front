import { Injectable, TemplateRef } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { RideDTO } from '../DTO/RideDTO';
import {BehaviorSubject} from "rxjs";

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
    });
  }

  openSocket(passengerId){
    this.stompClient.subscribe('/topic/passenger/ride/'+passengerId, (message) => {
      const ride: RideDTO = JSON.parse(message.body);
      console.log(ride);
      this.setReturnRide(ride);
    });
  }

  private returnRide$ = new BehaviorSubject<any>({});
  selectReturnRide$ = this.returnRide$.asObservable();
  setReturnRide(ride: RideDTO) {
    this.returnRide$.next(ride);
  }



  sendMessage(message) {
    this.stompClient.send('/app/send' , {}, message);
  }
}
