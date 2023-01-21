import { Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { DriverNotificationsComponent } from '../driver/components/driver-notifications/driver-notifications.component';
import { RideDTO } from '../DTO/RideDTO';
import { DriverService } from './driver.service';

@Injectable({
  providedIn: 'root'
})
export class DriverSocketService {
  notificationDisplayed: boolean = false;
  notificationQueue: RideDTO[] = [];

  constructor(private snackBar: MatSnackBar) {}

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
      const ride: RideDTO = JSON.parse(message.body);
      if (this.notificationDisplayed) {
      // Add notification to queue if there is already one being displayed
      this.notificationQueue.push(ride);
      } else {
      // Display notification immediately if there isn't one being displayed
      this.displayNotification(ride);
      }
      });
  }

displayNotification(ride: RideDTO) {
  this.notificationDisplayed = true;
  this.snackBar.openFromComponent(DriverNotificationsComponent, {
    data: {ride,
    duration: 60000,snackBarRef: this.snackBar},
    verticalPosition: 'top',
    panelClass:".custom-snack-bar"

    }).afterDismissed().subscribe(() => {
    // Check if there are any notifications in the queue when the current one is dismissed
    if (this.notificationQueue.length > 0) {
    // Display the next notification in the queue
    const nextRide = this.notificationQueue.shift()!;
    this.displayNotification(nextRide);
    } else {
    // Set the flag to false if the queue is empty
    this.notificationDisplayed = false;
    }
      });
  };
        
  sendMessage(message) {
    this.stompClient.send('/app/send' , {}, message);
  }
}
