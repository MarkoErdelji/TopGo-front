import { HttpClient } from '@angular/common/http';
import { Component, ContentChild, ElementRef, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DriverInfoDTO } from 'src/app/modules/DTO/DriverInfoDTO';
import { DriverSocketService } from 'src/app/modules/service/driver-socket.service';
import { DriverService } from 'src/app/modules/service/driver.service';
import { AuthService } from 'src/app/_service/auth.service';


@Component({
  selector: 'app-driver-menu',
  templateUrl: './driver-menu.component.html',
  styleUrls: ['./driver-menu.component.css']
})
export class DriverMenuComponent implements OnInit {

  imageUrl?:string
  constructor(private driverService: DriverService,private driverSocketService:DriverSocketService) {}

  ngOnInit(): void {
    this.driverService.getImageUrl().subscribe(url => this.imageUrl = url)
  }

  logout(){
    AuthService.doLogout();
  }

  sendMessageToSocket(){
    this.driverSocketService.sendMessage("Jebem ti mamu ja retardiranu");
  }

}
