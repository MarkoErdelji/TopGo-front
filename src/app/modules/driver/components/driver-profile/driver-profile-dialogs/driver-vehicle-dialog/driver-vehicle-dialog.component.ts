import { Component, OnInit } from '@angular/core';
import { VehicleInfoDTO } from 'src/app/modules/DTO/VehicleInfoDTO';
import { DriverService } from 'src/app/modules/service/driver.service';

@Component({
  selector: 'app-driver-vehicle-dialog',
  templateUrl: './driver-vehicle-dialog.component.html',
  styleUrls: ['./driver-vehicle-dialog.component.css']
})
export class DriverVehicleDialogComponent implements OnInit {

  vehicleInfo?:VehicleInfoDTO

  constructor(private driverService:DriverService) { }

  ngOnInit(): void {
    this.driverService.getDriverVehicle(this.driverService.id!).subscribe(response=>{
      this.vehicleInfo = response;
    })
  }

}
