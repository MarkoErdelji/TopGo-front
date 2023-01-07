import { Injectable } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { DriverService } from './driver.service';

@Injectable({
  providedIn: 'root'
})
export class DriverSocketService {

  constructor() {}

  public stompClient;
  public msg:any = [];
  initializeWebSocketConnection(driverId) {
    const serverUrl = 'http://localhost:8000/ws';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function() {
      that.openSocket(driverId);
    });
  }
  
  openSocket(driverId){
    this.stompClient.subscribe('/topic/driver/ride/'+driverId, (message) => {
      console.log(message.body);
    });
  }
  sendMessage(message) {
    this.stompClient.send('/app/send' , {}, message);
  }
}
