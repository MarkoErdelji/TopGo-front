import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverInfoDTO } from 'src/app/modules/DTO/DriverInfoDTO';
import { ImageService } from 'src/app/_service/image.service';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})
export class DriverProfileComponent implements OnInit {

  imageUrl?:string
  firstName?:string
  lastName?:string
  username?:string
  address?:string
  phone?:string

  constructor(private imageService:ImageService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.imageService.getImageUrl().subscribe(url => this.imageUrl = url)
    
    this.firstName = this.route.snapshot.paramMap.get('name')!;
    this.lastName = this.route.snapshot.paramMap.get('surname')!;
    this.username = this.route.snapshot.paramMap.get('email')!;
    this.address = this.route.snapshot.paramMap.get('address')!;
    this.phone = this.route.snapshot.paramMap.get('telephoneNumber')!;
  }

}
