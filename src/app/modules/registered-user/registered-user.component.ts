import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {catchError, map, of} from "rxjs";
import {DriverInfoDTO} from "../DTO/DriverInfoDTO";
import {DriverService} from "../service/driver.service";
import {UserService} from "../../_service/user.service";
import {AuthService} from "../../_service/auth.service";
import {RegisteredService} from "../service/registered.service";
import {PassengerInfoDTO} from "../DTO/PassengerInfoDTO";
import { PassengerSocketService } from '../service/passenger-socket.service';

@Component({
  selector: 'app-registered-user',
  templateUrl: './registered-user.component.html',
  styleUrls: ['./registered-user.component.css']
})
export class RegisteredUserComponent implements OnInit {
  private passengerInfo? :PassengerInfoDTO;

  constructor(private userService:UserService,private passengerService:RegisteredService,private authService:AuthService,private passengerSocketService:PassengerSocketService) { }

  ngOnInit(): void {
    
    this.userService.getUserByEmail(this.authService.getEmail()).subscribe(
      response=>{
        if(response.status == 200){
          this.passengerService.getPassengerById(response.body.id).pipe(
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
            this.passengerInfo = passengerResponse
            this.passengerService.id = passengerResponse?.id;

            console.log(passengerResponse);
          })
        }
        else{
          window.alert("Error: Email no longer in database");
        }
      }
    )

  }

}
