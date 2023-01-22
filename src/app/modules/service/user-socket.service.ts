import { Injectable, TemplateRef } from '@angular/core';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { RideDTO } from '../DTO/RideDTO';
import {BehaviorSubject} from "rxjs";
import {UserMessagesDTO} from "../DTO/UserMessagesDTO";

@Injectable({
  providedIn: 'root'
})
export class UserSocketService {


  constructor( ) {}

  public stompClient;
  public msg:any = [];
  initializeWebSocketConnection(userId) {
    const serverUrl = 'http://localhost:8000/ws';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function() {
      that.openSocket(userId);
    });
  }

  openSocket(userId){
    this.stompClient.subscribe('/topic/user/message/'+userId, (message) => {
      const msg: UserMessagesDTO = JSON.parse(message.body);
      console.log(msg);
      this.setReturnMessage(msg);
    });
  }


  private returnMessage$ = new BehaviorSubject<any>({});
  selectReturnMessage$ = this.returnMessage$.asObservable();
  setReturnMessage(msg: UserMessagesDTO) {
    this.returnMessage$.next(msg);
  }



  sendMessage(message) {
    this.stompClient.send('/app/send' , {}, message);
  }
}
