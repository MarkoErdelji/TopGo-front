import { HttpClient } from '@angular/common/http';
import { Component, ContentChild, ElementRef, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DriverInfoDTO } from 'src/app/modules/DTO/DriverInfoDTO';
import { AuthService } from 'src/app/_service/auth.service';
import { ImageService } from 'src/app/_service/image.service';

@Component({
  selector: 'app-driver-menu',
  templateUrl: './driver-menu.component.html',
  styleUrls: ['./driver-menu.component.css']
})
export class DriverMenuComponent implements OnInit {

  imageUrl?:string

  @Input()
  driverId?:DriverInfoDTO
  
  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.imageService.getImageUrl().subscribe(url => this.imageUrl = url)
  }

  logout(){
    AuthService.doLogout();
  }

}
