import { Component, OnInit } from '@angular/core';
import {DriverSocketService} from "../../../service/driver-socket.service";
import {RideDTO} from "../../../DTO/RideDTO";
import {MapService} from "../../../../components/map/map.service";
import {DriverService} from "../../../service/driver.service";
import {first, Subscription} from "rxjs";
import {DistanceAndAverageDTO} from "../../../DTO/DistanceAndAverageDTO";
import {RideService} from "../../../service/ride.service";
import {AuthService} from "../../../../_service/auth.service";
import {RegisteredService} from "../../../service/registered.service";
import {UserService} from "../../../service/user.service";
import {RouteFormService} from "../../../service/route-form.service";
import {VehicleDTO} from "../../../DTO/VehicleDTO";
import {LocationDTO} from "../../../unregistered-user/components/route-form/LocationDTO";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {
  EditProfileDialogComponent
} from "../../../registered-user/components/registered-profile/registered-profile-dialogs/edit-profile-dialog/edit-profile-dialog.component";
import {PanicDialogComponent} from "../../dialogs/panic-dialog/panic-dialog.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {RejectionTextDTO} from "../../../DTO/RejectionTextDTO";
import {RideNotificationComponent} from "../../../../components/dialogs/ride-notification/ride-notification.component";
import {PassengerInfoDTO} from "../../../DTO/PassengerInfoDTO";
import {UserRef} from "../../../DTO/UserRef";
import {
  ChatDialogComponent
} from "../../../registered-user/components/registered-route-form/registered-route-form-dialogs/chat-dialog/chat-dialog.component";
import {DriverChatComponent} from "../../dialogs/driver-chat/driver-chat.component";

@Component({
  selector: 'app-driver-current-ride',
  templateUrl: './driver-current-ride.component.html',
  styleUrls: ['./driver-current-ride.component.css']
})
export class DriverCurrentRideComponent implements OnInit {

  rideVisible: boolean = false;
  name: string = "";
  phoneNumber: string = "";
  email: string = "";
  distance?: number;
  time?: number;
  money: number = 0;
  status: string = "";
  isAccepted: boolean = false;
  rideId: number = 0;
  isStarted: boolean = false;
  hasRides: boolean = false;
  rejectionTextDTO?: RejectionTextDTO;
  profilePicture: string = '';
  passengers: PassengerInfoDTO[] = [];
  private subscriptions: Subscription[] = [];
  private currentRide?: RideDTO;
  constructor(private dialog:MatDialog ,private location:Location, private routeFormService:RouteFormService, private driverSocketSerivice:DriverSocketService, private mapService:MapService, private userService:UserService, private rideService:RideService, private authService:AuthService, private driverService:DriverService) { }

  ngOnInit(): void {
    this.haveAcceptedRides();
    this.haveActiveRides()
    this.driverSocketSerivice.selectReturnRide$.subscribe({next:(ride:RideDTO)=>{
      this.rideId = ride.id
      if(ride.status == "ACCEPTED"){

        this.setRideInfo(ride);
      }
      if(ride.status == "ACTIVE"){
        this.setRideInfo(ride);
      }
      if(ride.status == "FINISHED"){
        this.goBackHome();

      }
      if(ride.status == "PANIC"){
        this.goBackHome();

      }
        if(ride.status == "CANCELED"){
          this.goBackHome();
        }

      }})
  }

  private goBackHome() {
    this.isAccepted = false;
    this.isStarted = false;
    this.hasRides = false;
    this.rideVisible = false;
    this.routeFormService.clearRoute();
    this.driverService.updateToggle(true)
  }

  setRideInfo(ride: RideDTO) {
    this.currentRide = ride;
    this.driverService.updateToggle(false);
    this.hasRides = true;
    this.passengers.splice(0, this.passengers.length);
    for(let item of ride.passengers){
      this.subscriptions.push(
      this.userService.getUserById(String(item.id)).subscribe(passenger => {
        this.passengers.push(passenger);
      }))
    }

    this.time = ride.estimatedTimeInMinutes;
    this.status = ride.status;
    this.money = ride.totalCost;
    console.log(ride)
    this.rideVisible = true;
    if(ride.status == "ACCEPTED"){
      this.isAccepted = true;
      this.subscriptions.push(
      this.driverService.getDriverById(ride.driver.id).subscribe(driver=>{
        this.subscriptions.push(
        this.driverService.getDriverVehicle(driver.id).subscribe(vehicle=>{
          let location:LocationDTO = {
            location:vehicle.currentLocation.address,
            destination: ride.locations[0].departure.address
          }
          console.log(location)
          this.routeFormService.setLocation(location);
        }))
      }))
    }
    else if(ride.status == "ACTIVE"){
      let location:LocationDTO = {
        location:ride.locations[0].departure.address,
        destination: ride.locations[0].destination.address
      }
      this.isAccepted = false;
      this.isStarted = true;
      console.log(location)
      this.routeFormService.setLocation(location)
    }

  }

  haveAcceptedRides(){
    this.subscriptions.push(
    this.rideService.getDriverAcceptedRide(this.authService.getUserId()).subscribe(rideDTO=>{
      if(rideDTO != null) {
        this.setRideInfo(rideDTO)
      }
    }))
  }

  haveActiveRides(){
    this.subscriptions.push(
    this.rideService.getDriverActiveRide(this.authService.getUserId()).subscribe(rideDTO=>{
      if(rideDTO != null) {
        this.setRideInfo(rideDTO)
      }
    }))
  }

  startRide() {
    if(typeof this.rideId === "undefined"){
      this.subscriptions.push(
      this.rideService.getDriverAcceptedRide(this.authService.getUserId()).subscribe(rideDTO=>{
        if(rideDTO != null) {
          this.subscriptions.push(
          this.rideService.startRide(rideDTO.id).subscribe(response=>{
            if(response != null){
              this.rideService.simulateRide(rideDTO.id).subscribe(res=>{
                console.log(res);
              })
              console.log(response)
            }
          }))
        }
      }))
    }
    else{
      this.subscriptions.push(
      this.rideService.startRide(this.rideId).subscribe(response=>{
        if(response != null){
          console.log(response)
          this.rideService.simulateRide(this.rideId).subscribe(res=>{
            console.log(res);
          })
        }
      }))
    }

  }

  endRide() {
    if(typeof this.rideId === "undefined"){
      this.subscriptions.push(
      this.rideService.getDriverActiveRide(this.authService.getUserId()).subscribe(rideDTO=>{
        if(rideDTO != null) {
          this.subscriptions.push(
          this.rideService.finishRide(rideDTO.id).subscribe(response=>{
            if(response != null){
              const dialogRef = this.dialog.open(RideNotificationComponent, {
                width: '250px',
                data: {msg:"Ride is finished."}
              });
            }
          }))
        }
      }))
    }
    else{
      this.subscriptions.push(
      this.rideService.finishRide(this.rideId).subscribe(response=>{
        if(response != null){
          const dialogRef = this.dialog.open(RideNotificationComponent, {
            width: '250px',
            data: {msg:"Ride is finished."}
          });
        }
      }))
    }
  }

  onPanicClick() {
    const dialogRef = this.dialog.open(PanicDialogComponent, {
      width: '250px',
      data: {msg: "Panicim"}
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        if(typeof this.rideId === "undefined"){
          this.subscriptions.push(
          this.rideService.getDriverActiveRide(this.authService.getUserId()).subscribe(rideDTO=>{
            if(rideDTO != null) {
              this.subscriptions.push(
              this.rideService.panicRide(rideDTO.id, result).subscribe(response=>{
                console.log(response)
                const dialogRef = this.dialog.open(RideNotificationComponent, {
                  width: '300px',
                  data: {msg:"Ride is canceled cause panic was pressed"}
                });
              }))
            }
          }))

        }
        else{
          this.subscriptions.push(
          this.rideService.panicRide(this.rideId, result).subscribe(response=>{
            console.log(response)
            const dialogRef = this.dialog.open(RideNotificationComponent, {
              width: '300px',
              data: {msg:"Ride is canceled cause panic was pressed"}
            });

          }))
        }
      }
    })
  }

  cancelRide() {
    const dialogRef = this.dialog.open(PanicDialogComponent, {
      width: '250px',
      data: {msg: "Canceling ride"}
    });
    dialogRef.afterClosed().subscribe(result=>{
      if(result){
        if(typeof this.rideId === "undefined"){
          this.subscriptions.push(
          this.rideService.getDriverAcceptedRide(this.authService.getUserId()).subscribe(rideDTO=>{
            if(rideDTO != null) {
              this.subscriptions.push(
              this.rideService.cancelRide(rideDTO.id, result).subscribe(response=>{
                console.log(response)
                const dialogRef = this.dialog.open(RideNotificationComponent, {
                  width: '300px',
                  data: {msg:"Ride is canceled because " + result.reason}
                });
                this.goBackHome();
              }))
            }
          }))

        }
        else{
          this.subscriptions.push(
          this.rideService.cancelRide(this.rideId, result).subscribe(response=>{
            console.log(response)
            const dialogRef = this.dialog.open(RideNotificationComponent, {
              width: '300px',
              data: {msg:"Ride is canceled because " + result.reason}
            });
            this.goBackHome();

          }))
        }
      }
    })
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      console.log(subscription)
      subscription.unsubscribe()});
  }

  chat() {
    const dialogRef = this.dialog.open(DriverChatComponent, {
      width: '400px',
      data: {ride: this.currentRide}
    });
  }


}
