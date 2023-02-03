import { Component, OnInit } from '@angular/core';
import { VehicleInfoDTO } from 'src/app/modules/DTO/VehicleInfoDTO';
import { DriverService } from 'src/app/modules/service/driver.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-driver-vehicle-dialog',
  templateUrl: './driver-vehicle-dialog.component.html',
  styleUrls: ['./driver-vehicle-dialog.component.css']
})
export class DriverVehicleDialogComponent implements OnInit {

  vehicleInfo?:VehicleInfoDTO

  isForBabies:boolean = false;
  isForPets:boolean = false;
  private subscriptions: Subscription[] = [];
  constructor(private driverService:DriverService) { }

  ngOnInit(): void {
    this.subscriptions.push(
    this.driverService.getDriverVehicle(this.driverService.id!).subscribe(response=>{
      this.vehicleInfo = response;
      this.isForBabies = this.vehicleInfo.babyTransport;
      this.isForPets = this.vehicleInfo.petTransport;
    }))
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      console.log(subscription)
      subscription.unsubscribe()});
  }


}
