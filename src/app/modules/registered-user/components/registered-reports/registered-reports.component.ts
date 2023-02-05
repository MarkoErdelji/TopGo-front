import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {RideNotificationComponent} from "../../../../components/dialogs/ride-notification/ride-notification.component";
import {RegisteredService} from "../../../service/registered.service";
import {AuthService} from "../../../../_service/auth.service";
import {RideDTO} from "../../../DTO/RideDTO";
import {RideDayGraphComponent} from "../graphs/ride-day-graph/ride-day-graph.component";
import {KmPerDayGraphComponent} from "../graphs/km-per-day-graph/km-per-day-graph.component";
import {MoneySpentGraphComponent} from "../graphs/money-spent-graph/money-spent-graph.component";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registered-reports',
  templateUrl: './registered-reports.component.html',
  styleUrls: ['./registered-reports.component.css']
})
export class RegisteredReportsComponent implements OnInit,OnDestroy {
  rides:RideDTO[] =[];
  @ViewChild(RideDayGraphComponent) rideGraph!: RideDayGraphComponent;
  @ViewChild(KmPerDayGraphComponent) kmGraph!: KmPerDayGraphComponent;
  @ViewChild(MoneySpentGraphComponent) moneyGraph!: MoneySpentGraphComponent;
  @ViewChild('moneyGraph', {static: true}) moneyGraphPrint!: ElementRef;
  @ViewChild('rideGraph', {static: true}) rideGraphPrint!: ElementRef;
  @ViewChild('kmGraph', {static: true}) kmGraphPrint!: ElementRef;

  private subscriptions: Subscription[] = [];

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
    this.subscriptions.push(this.passengerService.getPassengerRides(this.authService.getUserId(),0,9000,utcDateStart?.toISOString(),utcDateEnd?.toISOString()).subscribe(response=>{
      console.log(response)
      this.rides = [];
      response.body!.results.forEach((element)=>{
        this.rides.push(element);
        //console.log(element);
      })
      this.rides.reverse();

    }))



  }
  changeGraphData() {
    if(this.kmGraph){
      this.kmGraph.updateRides(this.rides);
    }
    if(this.rideGraph){
    this.rideGraph.updateRides(this.rides);
      }
    if(this.moneyGraph){
      this.moneyGraph.updateRides(this.rides);
    }
  }
  async generateAllPdf() {
    const doc = new jsPDF('p', 'mm', 'a4');
    const options = {
      pagesplit: true
    };
    await html2canvas(this.moneyGraphPrint.nativeElement, { scale: 1 }).then(function (canvas) {
      doc.addImage(canvas.toDataURL('image/png'), 'JPEG', 10, 50, 200, 150);
      doc.addPage();
    });
    await html2canvas(this.kmGraphPrint.nativeElement, { scale: 1 }).then(function (canvas) {
      doc.addImage(canvas.toDataURL('image/png'), 'JPEG', 10, 50, 200, 150);
      doc.addPage();
    });
    await html2canvas(this.rideGraphPrint.nativeElement, { scale: 1 }).then(function (canvas) {
      doc.addImage(canvas.toDataURL('image/png'), 'JPEG', 10, 50, 200, 150);
      doc.addPage();
    });
    // download the pdf with all charts
    doc.save('Allcharts' + Date.now() + '.pdf');
    console.log(doc.path)
  }


  ngOnDestroy(){
    this.subscriptions.forEach(subscription=> subscription.unsubscribe());
  }
}
