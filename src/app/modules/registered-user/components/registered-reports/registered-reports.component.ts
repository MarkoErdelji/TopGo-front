import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {RideNotificationComponent} from "../../../../components/dialogs/ride-notification/ride-notification.component";
import {RegisteredService} from "../../../service/registered.service";
import {AuthService} from "../../../../_service/auth.service";
import {RideDTO} from "../../../DTO/RideDTO";
import {RideDayGraphComponent} from "../graphs/ride-day-graph/ride-day-graph.component";

@Component({
  selector: 'app-registered-reports',
  templateUrl: './registered-reports.component.html',
  styleUrls: ['./registered-reports.component.css']
})
export class RegisteredReportsComponent implements OnInit {
  rides:RideDTO[] =[];
  @ViewChild(RideDayGraphComponent) rideGraph!: RideDayGraphComponent;


  constructor(private dialog:MatDialog,private passengerService:RegisteredService,private authService:AuthService) {
  }

  dateForm = new FormGroup({
    startControl: new FormControl(),
    endControl: new FormControl(),
  });

  ngOnInit(): void {
  }

  changeGraphs() {
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
    this.passengerService.getPassengerRides(this.authService.getUserId(),0,9000,utcDateStart?.toISOString(),utcDateEnd?.toISOString()).subscribe(response=>{
      console.log(response)
      this.rides = [];
      response.body!.results.forEach((element)=>{
        this.rides.push(element);
        //console.log(element);
      })

    })



  }
  changeGraphData() {
    if(this.rideGraph){
    // code to retrieve updated rides array
    this.rideGraph.updateRides(this.rides);
      }
    else{
      console.log("ass")
    }
  }
}
