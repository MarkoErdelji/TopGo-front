import { Component, OnInit, ViewChild } from '@angular/core';
import { RideDTO } from 'src/app/modules/DTO/RideDTO';
import { DriverService } from 'src/app/modules/service/driver.service';
import { RideService } from 'src/app/modules/service/ride.service';
import { HistoryInstanceComponent } from './history-instance/history-instance.component';

@Component({
  selector: 'app-driver-history',
  templateUrl: './driver-history.component.html',
  styleUrls: ['./driver-history.component.css']
})
export class DriverHistoryComponent implements OnInit {

  rideDtos:RideDTO[] = []
  ridesLoaded:boolean = false;
  constructor(private rideService:RideService,private driverService:DriverService) { }

  ngOnInit(): void {
    this.rideService.getFinishedRidesByDriverId(this.driverService.id).subscribe(response=>{
      this.rideDtos = response.body || [];
      this.ridesLoaded = true;
    })
  }

}
