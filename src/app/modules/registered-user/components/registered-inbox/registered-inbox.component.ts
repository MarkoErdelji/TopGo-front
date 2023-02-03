import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user.service";
import {RegisteredService} from "../../../service/registered.service";
import {UserMessagesDTO} from "../../../DTO/UserMessagesDTO";
import {DriverInfoDTO} from "../../../DTO/DriverInfoDTO";
import {UserMessagesListDTO} from "../../../DTO/UserMessagesListDTO";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SendMessageDTO} from "../../../DTO/SendMessageDTO";
import {UserSocketService} from "../../../service/user-socket.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registered-inbox',
  templateUrl: './registered-inbox.component.html',
  styleUrls: ['./registered-inbox.component.css']
})
export class RegisteredInboxComponent implements OnInit {
  ids: string[] = [];
  messages: UserMessagesDTO[] = [];
  users:DriverInfoDTO[]=[];

  selectedUser!:DriverInfoDTO;
  chatUser:string = "";
  chat:UserMessagesDTO[] =[]
  private subscriptions: Subscription[] = [];

  sendForm = new FormGroup({
    messageLabel: new FormControl("",Validators.required),
  });

  constructor(private userService:UserService,private passengerService:RegisteredService,private userSocketService:UserSocketService) { }



  ngOnInit(): void {

    this.subscriptions.push(this.userSocketService.selectReturnMessage$.subscribe(msg =>
    {
      if(this.selectedUser.id == msg.receiverId)
      {
        this.chat.push(msg);
      }
      else if(this.selectedUser.id == msg.senderId)
      {
        this.chat.push(msg);
      }
    }))

    function loadChats() {

    }

    loadChats()
    {
      this.subscriptions.push(this.userService.getUserMessages(this.passengerService.id!).subscribe(messages =>
      {
        console.log(messages.results)
        for (let msg of messages.results) {
          let id = "";
          if (msg.senderId !== this.passengerService.id!) {
            id = msg.senderId.toString();
          }
          if (msg.senderId === this.passengerService.id!) {
            id = msg.receiverId.toString();
          }
          if (!this.ids.includes(id)) {
            this.messages.push(msg);
            this.ids.push(id);
          }
        }
        console.log(this.messages)
        this.ids.forEach(id => {
          this.userService.getUserById(id).subscribe(user =>
          {
            this.users.push(user);
          })


        });
      }))

    }
  }

  handleClick(user: DriverInfoDTO) {
    this.selectedUser = user;
    console.log(this.selectedUser)
    this.chatUser = user.name +" " + user.surname;
    if (this.userSocketService.stompClient && this.userSocketService.stompClient.connected) {
      this.userSocketService.stompClient.disconnect();
    }
    this.userSocketService.initializeWebSocketConnection(this.selectedUser.id);


    function showMessages() {

    }

    showMessages()
    {
      this.subscriptions.push(this.userService.getMessagesBetweenUsers(this.selectedUser.id).subscribe(response =>
      {
        this.chat = response.results;
        console.log(this.chat)
      }))

    }

  }

  sendMessage() {
    console.log(this.sendForm.get("messageLabel")?.value)

    if(this.sendForm.valid) {
      let messageToSend: SendMessageDTO = {
        message: this.sendForm.get("messageLabel")?.value || '',
        type: "RIDE",
        // @ts-ignore
        rideId: 1
      }

      this.userService.sendMessage(this.selectedUser.id, messageToSend!).subscribe(response => {
        this.sendForm.get("messageLabel")?.setValue("");
      });
    }

  }

  ngOnDestroy(){
    this.userSocketService.initializeWebSocketConnection(this.selectedUser.id);
    this.subscriptions.forEach(subscription=>subscription.unsubscribe())
  }
}
