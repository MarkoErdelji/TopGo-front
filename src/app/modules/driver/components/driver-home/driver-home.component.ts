import { Component, OnInit } from '@angular/core';
import {MapService} from "../../../../components/map/map.service";
import {AuthService} from "../../../../_service/auth.service";
import {DriverService} from "../../../service/driver.service";
import {DriverInfoDTO} from "../../../DTO/DriverInfoDTO";
import {DriverActivityDTO} from "../../../DTO/DriverActivityDTO";
import {StartTimeDTO} from "../../../DTO/StartTimeDTO";
import {WorkHoursDTO} from "../../../DTO/WorkHoursDTO";
import {EndTimeDTO} from "../../../DTO/EndTimeDTO";
import {catchError, Subscription, throwError} from "rxjs";
import {RideNotificationComponent} from "../../../../components/dialogs/ride-notification/ride-notification.component";
import {MatDialog} from "@angular/material/dialog";
import {DriverSocketService} from "../../../service/driver-socket.service";


@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit {
  isSwitched: boolean = false;
  driver!:DriverInfoDTO;

  currentWorkingHours?:WorkHoursDTO;
  isAvailable: boolean = true;

  private subscriptions: Subscription[] = [];


  constructor(private dialog:MatDialog, private authService: AuthService, private driverService:DriverService, private driverSocketService:DriverSocketService) {
    this.driverService.currentAvailability.subscribe(state => {
      this.isAvailable = state;
    });
  }

  ngOnInit(): void {
    console.log(this.isAvailable)
    this.subscriptions.push(
    this.driverService.getDriverById(this.authService.getUserId()).subscribe(driver=>{
      this.driver = driver;
      this.driverService.getDriverWorkingHours(this.driver.id).subscribe(response=>{
        for(let workingHour of response.results){
          if(workingHour.end == null){
            this.currentWorkingHours = workingHour;
            this.isSwitched = true;
          }
        }
      })
    }))

    this.driverSocketService.selectReturnDriver$.subscribe({next:(driver: DriverInfoDTO)=>{
      if(driver != null){
        if(this.isSwitched){
          this.isSwitched = false;
          let nowTime = new Date()
          let utcDateStart = new Date(Date.UTC(nowTime.getFullYear(),nowTime.getMonth(),nowTime.getDate(),nowTime.getHours(),nowTime.getMinutes(),nowTime.getSeconds()));
          let timeDTO:EndTimeDTO={
            end: utcDateStart.toISOString()
          }
          this.subscriptions.push(
          this.driverService.updateWorkingHour(this.currentWorkingHours!.id, timeDTO).subscribe(response=>{
            let driverActivity:DriverActivityDTO={
              isActive: false
            }
            this.subscriptions.push(
            this.driverService.updateDriverActivity(driverActivity, driver.id).subscribe(res=>{
              const dialogRef = this.dialog.open(RideNotificationComponent, {
                width: '250px',
                data: {msg:"You exceeded 8 hours of work!\nYou cannot accept any rides for today."}
              });
            }))

          }))
        }


      }
    }})

  }

  onToggleChange() {

    if(this.isSwitched){
      let nowTime = new Date()
      let utcDateStart = new Date(Date.UTC(nowTime.getFullYear(),nowTime.getMonth(),nowTime.getDate(),nowTime.getHours(),nowTime.getMinutes(),nowTime.getSeconds()));
      let timeDTO:StartTimeDTO={
        start: utcDateStart.toISOString()
      }
      this.subscriptions.push(
      this.driverService.addWorkingHour(this.driver.id, timeDTO)
        .pipe(catchError(error=>{
          console.log(error.error.message);
          const dialogRef = this.dialog.open(RideNotificationComponent, {
            width: '350px',
            data: {msg:error.error.message}
          });
          this.isSwitched = false;
          return throwError(error);
        }))
        .subscribe(response=>{
          let updatedDriverDTO:DriverActivityDTO={isActive: true}
          this.subscriptions.push(
          this.driverService.updateDriverActivity(updatedDriverDTO, this.driver.id).subscribe(response=> {
          }))
          this.currentWorkingHours = response.body!;
        }))


    }
    else{
      let updatedDriverDTO:DriverActivityDTO={isActive: false}
      this.subscriptions.push(
      this.driverService.updateDriverActivity(updatedDriverDTO, this.driver.id)
        .subscribe(response=> {
          let nowTime = new Date()
          let utcDateStart = new Date(Date.UTC(nowTime.getFullYear(),nowTime.getMonth(),nowTime.getDate(),nowTime.getHours(),nowTime.getMinutes(),nowTime.getSeconds()));
        let timeDTO:EndTimeDTO={
          end: utcDateStart.toISOString()
        }
        this.driverService.updateWorkingHour(this.currentWorkingHours!.id, timeDTO).subscribe(response=>{
          console.log(response.body)
        })
      }))
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      console.log(subscription)
      subscription.unsubscribe()});
  }
}
