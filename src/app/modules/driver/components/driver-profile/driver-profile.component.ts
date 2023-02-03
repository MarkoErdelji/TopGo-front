import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {map, Subscription} from 'rxjs';
import { DriverGraphDTO } from 'src/app/modules/DTO/DriverGraphDTO';
import { DriverInfoDTO } from 'src/app/modules/DTO/DriverInfoDTO';
import { RideDTO } from 'src/app/modules/DTO/RideDTO';
import { DriverService } from 'src/app/modules/service/driver.service';
import { AuthService } from 'src/app/_service/auth.service';
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
  dataLoaded:boolean = false;
  driverData:DriverGraphDTO= <DriverGraphDTO> {fullName:'',data:[]};
  private subscriptions: Subscription[] = [];

  constructor(private route: ActivatedRoute,private authService:AuthService,private driverService:DriverService,private dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscriptions.push(
    this.driverService.getImageUrl().subscribe(url => this.imageUrl = url))

    this.subscriptions.push(
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
      this.driverService.getDriverRides(this.authService.getUserId(),0,9000,null,null,null).subscribe(res=>{
        this.driverData.data = res.body?.results || [];
        this.driverData.data.reverse();
        this.driverData.fullName = this.firstName +" "+ this.lastName
        this.dataLoaded = true;
      })
    }))

  }




  openDocuments(){
      this.dialog.open(DriverDocumentsDialogComponent,{ panelClass: 'custom-dialog-container' });
  }


  openVehicle(){
    this.dialog.open(DriverVehicleDialogComponent,{ panelClass: 'custom-dialog-container'});
}
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      console.log(subscription)
      subscription.unsubscribe()});
  }
}
