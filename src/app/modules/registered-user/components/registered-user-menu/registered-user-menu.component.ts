import { Component, OnInit } from '@angular/core';
import { PassengerSocketService } from 'src/app/modules/service/passenger-socket.service';
import { AuthService } from 'src/app/_service/auth.service';
import {RegisteredService} from "../../../service/registered.service";

@Component({
  selector: 'app-registered-user-menu',
  templateUrl: './registered-user-menu.component.html',
  styleUrls: ['./registered-user-menu.component.css']
})
export class RegisteredUserMenuComponent implements OnInit {
  pfp?: string;

  constructor(private passengerSocketService:PassengerSocketService,private passengerService:RegisteredService,private authService:AuthService) { }

  ngOnInit(): void {
    this.passengerService.getPassengerById(this.authService.getUserId()).subscribe(response =>
    {
      this.pfp = response.profilePicture;
    })
  }

  logout(){
    this.passengerSocketService.stompClient.disconnect()
    this.authService.doLogout();
  }
}
