import { Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { DriverNotificationsComponent } from '../driver/components/driver-notifications/driver-notifications.component';
import { RideDTO } from '../DTO/RideDTO';
import { DriverService } from './driver.service';
import {BehaviorSubject} from "rxjs";
import { GeoLocationDTO } from '../DTO/GeoLocationDTO';
import { RouteFormService } from './route-form.service';
import {DriverInfoDTO} from "../DTO/DriverInfoDTO";

@Injectable({
  providedIn: 'root'
})
export class DriverSocketService {
  notificationDisplayed: boolean = false;
  notificationQueue: RideDTO[] = [];

  constructor(private snackBar: MatSnackBar,private routeService:RouteFormService) {}

  public stompClient;
  public msg:any = [];
  initializeWebSocketConnection(driverId) {
    const serverUrl = 'http://localhost:8000/ws';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function() {
      that.openSocket(driverId);
      that.openVehicleLocationSocket(driverId);
      that.openDriverWorkHourSocket(driverId);
    });
  }

  openSocket(driverId){
    this.stompClient.subscribe('/topic/driver/ride/'+driverId, (message) => {
      try{
        const ride: RideDTO = JSON.parse(message.body);
        if(ride.status == "PENDING" || ride.status == "SCHEDULED"){
          if (this.notificationDisplayed) {
            // Add notification to queue if there is already one being displayed
            this.notificationQueue.push(ride);
          } else {
            // Display notification immediately if there isn't one being displayed
            this.displayNotification(ride);
          }
        }
        else{
          this.setReturnRide(ride);
        }
      }
      catch{
        const error:String = message.body;
        console.log(error);
        this.setReturnError(error);
      }


      });
  }

  openDriverWorkHourSocket(driverId){
    this.stompClient.subscribe('/topic/work-hour/driver/'+driverId, (message) => {
      try{
          const driverInfoDTO: DriverInfoDTO = JSON.parse(message.body);
          if(driverInfoDTO != null){
            this.setReturnDriver(driverInfoDTO)
          }
        }

      catch{
        const error:String = message.body;
        console.log(error);
        this.setReturnError(error);
      }


    });
  }

  private returnDriver$ = new BehaviorSubject<any>({});
  selectReturnDriver$ = this.returnDriver$.asObservable();
  setReturnDriver(driver: DriverInfoDTO) {
    this.returnDriver$.next(driver);
  }

  openVehicleLocationSocket(driverId){
    this.stompClient.subscribe('/topic/vehicleLocation/ride/user/'+driverId, (message) => {
      try{
        const geoLocation: GeoLocationDTO = JSON.parse(message.body);
        console.log(geoLocation);
        this.routeService.changeMarkerLocation(geoLocation);         }
        catch{
          return;
        }
    });
  }

  private returnVehicleLocation$ = new BehaviorSubject<any>({});
  selectReturnVehicleLocation$ = this.returnVehicleLocation$.asObservable();
  setReturnVehicleLocation(location: GeoLocationDTO) {
    this.returnVehicleLocation$.next(location);
  }

  private returnRide$ = new BehaviorSubject<any>({});
  selectReturnRide$ = this.returnRide$.asObservable();
  setReturnRide(ride: RideDTO) {
    this.returnRide$.next(ride);
  }


  private returnError$ = new BehaviorSubject<any>({});
  selectReturnError$ = this.returnRide$.asObservable();
  setReturnError(error: String) {
    this.returnError$.next(error);
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
