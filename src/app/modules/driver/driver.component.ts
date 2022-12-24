import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_service/auth.service';
import { ImageService } from 'src/app/_service/image.service';
import { UserService } from 'src/app/_service/user.service';
import { DriverInfoDTO } from '../DTO/DriverInfoDTO';
import { DriverService } from '../service/driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  private driverInfo?:DriverInfoDTO;

  driverId?:DriverInfoDTO;


  constructor(private userService:UserService,private driverService:DriverService,private authService:AuthService,private imageService:ImageService) { }

  ngOnInit(): void {
    this.userService.getUserByEmail(this.authService.getEmail()).subscribe(
      response=>{
        if(response.status == 200){
          this.driverService.getDriverById(response.body.id).subscribe(driverResponse=>
            {
              this.driverInfo = driverResponse
              this.sendBase64('data:image/png;base64,'+this.driverInfo?.profilePicture || '')
              this.driverId = driverResponse as DriverInfoDTO;
              console.log(driverResponse);
            })
        }
        else{
          window.alert("Error: Email no longer in database");
        }
      }
    )
    
  }


  sendBase64(data:string) {
    const base64Data = data;
    this.imageService.setImageUrl(base64Data);
  }
}
