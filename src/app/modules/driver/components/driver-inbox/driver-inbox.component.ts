import { Component, OnInit } from '@angular/core';
import {UserMessagesDTO} from "../../../DTO/UserMessagesDTO";
import {DriverInfoDTO} from "../../../DTO/DriverInfoDTO";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {RegisteredService} from "../../../service/registered.service";
import {UserSocketService} from "../../../service/user-socket.service";
import {SendMessageDTO} from "../../../DTO/SendMessageDTO";
import {AuthService} from "../../../../_service/auth.service";

@Component({
  selector: 'app-driver-inbox',
  templateUrl: './driver-inbox.component.html',
  styleUrls: ['./driver-inbox.component.css']
})
export class DriverInboxComponent implements OnInit {

  ids: string[] = [];
  messages: UserMessagesDTO[] = [];
  users:DriverInfoDTO[]=[];

  selectedUser!:DriverInfoDTO;
  chatUser:string = "";
  chat:UserMessagesDTO[] =[]

  sendForm = new FormGroup({
    messageLabel: new FormControl("",Validators.required),
  });

  constructor(private userService:UserService,private authService:AuthService,private userSocketService:UserSocketService) { }



  ngOnInit(): void {

    this.userSocketService.selectReturnMessage$.subscribe(msg =>
    {
      if(this.selectedUser.id == msg.receiverId)
      {
        this.chat.push(msg);
      }
      else if(this.selectedUser.id == msg.senderId)
      {
        this.chat.push(msg);
      }
    })

    function loadChats() {

    }

    loadChats()
    {
      this.userService.getUserMessages(this.authService.getUserId()).subscribe(messages =>
      {
        console.log(messages.results)
        for (let msg of messages.results) {
          let id = "";
          if (msg.senderId !== this.authService.getUserId()) {
            id = msg.senderId.toString();
          }
          if (msg.senderId === this.authService.getUserId()) {
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
      })

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
      this.userService.getMessagesBetweenUsers(this.selectedUser.id).subscribe(response =>
      {
        this.chat = response.results;
        console.log(this.chat)
      })

    }

  }

  handleClickSupport() {
    this.selectedUser =
      {id: 1,
        name: "Driver",
        surname: "Support",
        profilePicture: "",
        telephoneNumber: "string",
        email: "",
        address: ""}
    console.log(this.selectedUser)
    this.chatUser = this.selectedUser.name +" " + this.selectedUser.surname;
    if (this.userSocketService.stompClient && this.userSocketService.stompClient.connected) {
      this.userSocketService.stompClient.disconnect();
    }
    this.userSocketService.initializeWebSocketConnection(this.selectedUser.id);


    function showMessages() {

    }

    showMessages()
    {
      this.userService.getMessagesBetweenUsers(this.selectedUser.id).subscribe(response =>
      {
        this.chat = response.results;
        console.log(this.chat)
      })

    }

  }

  sendMessage() {
    console.log(this.sendForm.get("messageLabel")?.value)

    if (this.sendForm.valid) {
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
}

