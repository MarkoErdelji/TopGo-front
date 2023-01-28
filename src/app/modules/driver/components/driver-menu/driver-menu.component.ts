import { HttpClient } from '@angular/common/http';
import { Component, ContentChild, ElementRef, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DriverInfoDTO } from 'src/app/modules/DTO/DriverInfoDTO';
import { DriverSocketService } from 'src/app/modules/service/driver-socket.service';
import { DriverService } from 'src/app/modules/service/driver.service';
import { AuthService } from 'src/app/_service/auth.service';
import {EndTimeDTO} from "../../../DTO/EndTimeDTO";


@Component({
  selector: 'app-driver-menu',
  templateUrl: './driver-menu.component.html',
  styleUrls: ['./driver-menu.component.css']
})
export class DriverMenuComponent implements OnInit {

  imageUrl?:string
  constructor(private driverService: DriverService,private driverSocketService:DriverSocketService, private authService:AuthService) {}

  ngOnInit(): void {
    this.driverService.getImageUrl().subscribe(url => this.imageUrl = url)
  }

  logout(){
    this.driverService.getDriverWorkingHours(this.authService.getUserId()).subscribe(response=>{
      for(let workingHour of response.results){
        if(workingHour.end == null){
          let nowTime = new Date()
          let utcDateStart = new Date(Date.UTC(nowTime.getFullYear(),nowTime.getMonth(),nowTime.getDate(),nowTime.getHours(),nowTime.getMinutes(),nowTime.getSeconds()));
          let endDTO:EndTimeDTO={
            end:utcDateStart.toISOString()
          }
          this.driverService.updateWorkingHour(workingHour.id, endDTO).subscribe(response=>{
            console.log(response)
            AuthService.doLogout();
          })
        }
      }
    })

  }

  sendMessageToSocket(){
    this.driverSocketService.sendMessage("Hellou");
  }

}
