import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { AuthService } from 'src/app/_service/auth.service';
import { UserService } from 'src/app/_service/user.service';
import { DriverInfoDTO } from '../DTO/DriverInfoDTO';
import { DriverService } from '../service/driver.service';
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { DriverSocketService } from '../service/driver-socket.service';
import { RideNotificationComponent } from 'src/app/components/dialogs/ride-notification/ride-notification.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
})
export class DriverComponent implements OnInit {

  private driverInfo?:DriverInfoDTO;
  private newPassword!:string|null;



  constructor(private dialog:MatDialog,private userService:UserService,private driverService:DriverService,private authService:AuthService,private driverSocketService:DriverSocketService) { }


  ngOnInit(): void {
  
    this.userService.getUserByEmail(this.authService.getEmail()).subscribe(
      response=>{
        if(response.status == 200){
          this.driverService.getDriverById(response.body.id).pipe(
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
          subscribe(driverResponse=>
            {
              this.driverInfo = driverResponse
              this.sendBase64(this.driverInfo?.profilePicture || '')
              this.driverService.id = driverResponse?.id;
              this.driverSocketService.initializeWebSocketConnection(this.driverService.id);
              console.log(driverResponse);
            })
        }
        else{
          const dialogRef = this.dialog.open(RideNotificationComponent, {
            width: '250px',
            data: {msg:"Error: Email no longer in database"}
          });
        }
      }
    )

    
  }


  sendBase64(data:string) {
    const base64Data = data;
    this.driverService.setImageUrl(base64Data);
  }
}
