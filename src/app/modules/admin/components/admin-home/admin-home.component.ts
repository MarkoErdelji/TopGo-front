import { Component, OnInit } from '@angular/core';
import {PanicService} from "../../../service/panic.service";
import {MapService} from "../../../../components/map/map.service";
import {DriverService} from "../../../service/driver.service";
import {PanicVehicleDTO} from "../../../DTO/PanicVehicleDTO";

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  constructor(private panicService:PanicService,private mapService:MapService,private driverService:DriverService) {

  }

  allPanic:PanicVehicleDTO[] = [];


  ngOnInit(): void {
    this.driverService.getOnlyActive().subscribe(res=>
    {
      res.results.forEach(driver =>
      {

        console.log(driver)
        this.driverService.setLocation(driver);

      })
    })
    this.panicService.getAllPanic().subscribe(res =>
    {
      res.results.forEach(panic =>
      {
        this.driverService.getDriverVehicle(panic.ride.driver.id).subscribe(vehicle =>
        {
          let panicVeh:PanicVehicleDTO =
            {
              panic:panic,
              vehicle:vehicle
            }
          this.allPanic.push(panicVeh)

        })

      })

    })

  }

}
