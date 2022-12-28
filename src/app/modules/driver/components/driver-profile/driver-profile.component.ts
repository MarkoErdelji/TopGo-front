import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { DriverInfoDTO } from 'src/app/modules/DTO/DriverInfoDTO';
import { DriverService } from 'src/app/modules/service/driver.service';
import { DriverDocumentsDialogComponent } from './driver-profile-dialogs/driver-documents-dialog/driver-documents-dialog.component';
import { DriverVehicleDialogComponent } from './driver-profile-dialogs/driver-vehicle-dialog/driver-vehicle-dialog.component';

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

  constructor(private route: ActivatedRoute,private driverService:DriverService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.driverService.getImageUrl().subscribe(url => this.imageUrl = url)
    
    this.driverService.getDriverById(this.driverService.id || 0).pipe(
      map(data => {
        if (data) {
          return data as DriverInfoDTO;
        }
        return;
      })
      ).subscribe(response=>{
      this.firstName = response?.name
      this.lastName = response?.surname
      this.username = response?.email
      this.address = response?.address
      this.phone = response?.telephoneNumber
    })
  
  }




  openDocuments(){
      this.dialog.open(DriverDocumentsDialogComponent,{ panelClass: 'custom-dialog-container' });
  }


  openVehicle(){
    this.dialog.open(DriverVehicleDialogComponent,{ panelClass: 'custom-dialog-container'});
}
}
