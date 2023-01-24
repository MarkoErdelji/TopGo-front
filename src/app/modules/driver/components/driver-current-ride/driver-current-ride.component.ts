import { Component, OnInit } from '@angular/core';
import {DriverSocketService} from "../../../service/driver-socket.service";
import {RideDTO} from "../../../DTO/RideDTO";
import {MapService} from "../../../../components/map/map.service";
import {DriverService} from "../../../service/driver.service";
import {first} from "rxjs";
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
  constructor(private location:Location, private routeFormService:RouteFormService, private driverSocketSerivice:DriverSocketService, private mapService:MapService, private userService:UserService, private rideService:RideService, private authService:AuthService, private driverService:DriverService) { }

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
        window.alert("Ride is finished")
        this.isAccepted = false;
        this.isStarted = false;
        this.hasRides = false;
        this.rideVisible = false;
        this.routeFormService.clearRoute();

      }
      }})
  }

  setRideInfo(ride: RideDTO) {
    this.hasRides = true;
    this.userService.getUserById(String(ride.passengers[0].id)).subscribe(passenger => {
      this.name = passenger.name + ' ' + passenger.surname;
      this.phoneNumber = passenger.telephoneNumber;
      this.email = passenger.email;
    })
    this.time = ride.estimatedTimeInMinutes;
    this.status = ride.status;
    this.money = ride.totalCost;
    console.log(ride)
    this.rideVisible = true;
    if(ride.status == "ACCEPTED"){
      this.isAccepted = true;
      this.driverService.getDriverById(ride.driver.id).subscribe(driver=>{
        this.driverService.getDriverVehicle(driver.id).subscribe(vehicle=>{
          let location:LocationDTO = {
            location:vehicle.currentLocation.address,
            destination: ride.locations[0].departure.address
          }
          console.log(location)
          this.routeFormService.setLocation(location);
        })
      })
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
    this.rideService.getDriverAcceptedRide(this.authService.getUserId()).subscribe(rideDTO=>{
      if(rideDTO != null) {
        this.setRideInfo(rideDTO)
      }
    })
  }

  haveActiveRides(){
    this.rideService.getDriverActiveRide(this.authService.getUserId()).subscribe(rideDTO=>{
      if(rideDTO != null) {
        this.setRideInfo(rideDTO)
      }
    })
  }

  startRide() {
    if(typeof this.rideId === "undefined"){
      this.rideService.getDriverAcceptedRide(this.authService.getUserId()).subscribe(rideDTO=>{
        if(rideDTO != null) {
          this.rideService.startRide(rideDTO.id).subscribe(response=>{
            if(response != null){
              this.rideService.simulateRide(rideDTO.id).subscribe(res=>{
                console.log(res);
              })
              console.log(response)
            }
          })
        }
      })
    }
    else{
      this.rideService.startRide(this.rideId).subscribe(response=>{
        if(response != null){
          console.log(response)
        }
      })
    }

  }

  endRide() {
    if(typeof this.rideId === "undefined"){
      this.rideService.getDriverActiveRide(this.authService.getUserId()).subscribe(rideDTO=>{
        if(rideDTO != null) {
          this.rideService.finishRide(rideDTO.id).subscribe(response=>{
            if(response != null){
              console.log(response)
            }
          })
        }
      })
    }
    else{
      this.rideService.finishRide(this.rideId).subscribe(response=>{
        if(response != null){
          console.log(response)
        }
      })
    }
  }
}
