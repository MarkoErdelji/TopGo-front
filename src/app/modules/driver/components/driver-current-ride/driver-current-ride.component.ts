import { Component, OnInit } from '@angular/core';
import {DriverSocketService} from "../../../service/driver-socket.service";
import {RideDTO} from "../../../DTO/RideDTO";
import {MapService} from "../../../../components/map/map.service";
import {DriverService} from "../../../service/driver.service";
import {first} from "rxjs";
import {DistanceAndAverageDTO} from "../../../DTO/DistanceAndAverageDTO";
import {RideService} from "../../../service/ride.service";
import {AuthService} from "../../../../_service/auth.service";

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
  constructor(private driverSocketSerivice:DriverSocketService, private mapService:MapService, private driverService:DriverService, private rideService:RideService, private authService:AuthService) { }

  ngOnInit(): void {
    this.haveAcceptedRides();
    this.driverSocketSerivice.selectReturnRide$.subscribe({next:(ride:RideDTO)=>{
      console.log("Ide gas matoriiiiiiii")
      if(ride.status == "ACCEPTED"){
        this.setRideInfo(ride);
      }
      }})
  }

  setRideInfo(ride: RideDTO) {
    this.driverService.getDriverById(ride.driver.id).subscribe(driver => {
      this.name = driver.name + ' ' + driver.surname;
      this.phoneNumber = driver.telephoneNumber;
      this.email = driver.email;
      this.mapService.selectDistanceAndAverage$.subscribe({
        next: (distance: DistanceAndAverageDTO) => {
          this.distance = distance.distance;
          this.time = distance.average;
          console.log("distanca"+this.distance);
          console.log("vreme"+this.time);
        }
      })
    })

    this.status = ride.status;
    this.money = ride.totalCost;
    console.log(ride)
    this.rideVisible = true;
  }

  haveAcceptedRides(){
    this.rideService.getDriverAcceptedRide(this.authService.getUserId()).subscribe(rideDTO=>{
      if(rideDTO != null) {
        this.setRideInfo(rideDTO)
        this.rideVisible = true;

      }
    })
  }

}
