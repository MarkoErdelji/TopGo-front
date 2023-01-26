import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RideNotificationComponent } from 'src/app/components/dialogs/ride-notification/ride-notification.component';
import { RideDTO } from 'src/app/modules/DTO/RideDTO';
import { DriverService } from 'src/app/modules/service/driver.service';
import { AuthService } from 'src/app/_service/auth.service';
import { LineGraphDTO, NameValueInstance } from 'src/app/modules/DTO/LineGraphDTO';
import { DriverGraphDTO } from 'src/app/modules/DTO/DriverGraphDTO';

@Component({
  selector: 'app-driver-reports',
  templateUrl: './driver-reports.component.html',
  styleUrls: ['./driver-reports.component.css']
})
export class DriverReportsComponent implements OnInit {

  constructor(private dialog:Dialog,private driverService:DriverService,private authService:AuthService) { }
  dateForm = new FormGroup({
    startControl: new FormControl(),
    endControl: new FormControl(),
  });
  graphData:Object[] = [];
  driverData:DriverGraphDTO = <DriverGraphDTO> {fullName:'',data:[]};
  driverDataForChart:DriverGraphDTO = <DriverGraphDTO> {fullName:'',data:[]};
  dataLoaded:boolean = false;

  ngOnInit(): void {
    this.driverService.getDriverById(this.authService.getUserId()).subscribe((res)=>{
      this.driverData.fullName = res.name + " " +res.surname;
      this.driverDataForChart.fullName = res.name+" "+res.surname;
     })
    this.driverService.getDriverRides(this.authService.getUserId(),0,9000,null,null,null).subscribe(response=>{
      response.body!.results.forEach((element)=>{
          this.driverData.data.push(element);
          this.driverDataForChart.data.push(element);
      })
      this.driverData.data.reverse();
      this.driverDataForChart.data.reverse();
      this.dataLoaded = true;
    }) }

  changeGraphs(){
    if(this.dateForm.controls.endControl.value!= null && this.dateForm.controls.startControl.value!=null){
      if(this.dateForm.controls.endControl.value < this.dateForm.controls.startControl.value){
        const dialogRef = this.dialog.open(RideNotificationComponent, {
          width: '250px',
          data: {msg:"Start time can not be before end time!"}
        });
        return
      }
    }
    let utcDateEnd:Date|null = null;
    if(this.dateForm.controls.endControl.value != null){
      utcDateEnd = new Date(Date.UTC(this.dateForm.controls.endControl.value.getFullYear(),this.dateForm.controls.endControl.value.getMonth(),this.dateForm.controls.endControl.value.getDate(),this.dateForm.controls.endControl.value.getHours(),this.dateForm.controls.endControl.value.getMinutes(),this.dateForm.controls.endControl.value.getSeconds()));

    }
    let utcDateStart:Date|null = null
    if(this.dateForm.controls.startControl.value !=null){
      utcDateStart = new Date(Date.UTC(this.dateForm.controls.startControl.value.getFullYear(),this.dateForm.controls.startControl.value.getMonth(),this.dateForm.controls.startControl.value.getDate(),this.dateForm.controls.startControl.value.getHours(),this.dateForm.controls.startControl.value.getMinutes(),this.dateForm.controls.startControl.value.getSeconds()));

    }
    
  }
}
