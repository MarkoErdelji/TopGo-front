import { Dialog } from '@angular/cdk/dialog';
import { HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { forkJoin, Observable } from 'rxjs';
import { RideNotificationComponent } from 'src/app/components/dialogs/ride-notification/ride-notification.component';
import { DriverGraphDTO } from 'src/app/modules/DTO/DriverGraphDTO';
import { UserRidesListDTO } from 'src/app/modules/DTO/UserRidesListDTO';
import { DriverService } from 'src/app/modules/service/driver.service';
import { AuthService } from 'src/app/_service/auth.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-admin-reports',
  templateUrl: './admin-reports.component.html',
  styleUrls: ['./admin-reports.component.css']
})
export class AdminReportsComponent implements OnInit {

  constructor(private dialog:Dialog,private userService:UserService,private driverService:DriverService,private authService:AuthService) { }
  dateForm = new FormGroup({
    startControl: new FormControl(),
    endControl: new FormControl(),
  });
  graphData:Object[] = [];
  driverData:DriverGraphDTO = <DriverGraphDTO> {fullName:'',data:[]};
  allData:DriverGraphDTO[] = [];
  dataLoaded:boolean = false;
  chartDataLoaded:boolean = false;
  

  @ViewChild('printable')
  pdfTable!: ElementRef;

  ngOnInit(): void {
    this.userService.getUsers(0,9000).subscribe((res) => {
      console.log(res);
      let driverRidesObservables:Observable<HttpResponse<UserRidesListDTO>>[]= [];
      res.body!.results.forEach((driver) => {
          let currentDriver = driver;
          driverRidesObservables.push(this.userService.getUsersRides(currentDriver.id,0,9000,null,null,null));
      });
      forkJoin(driverRidesObservables).subscribe((responses) => {
        responses.forEach((response,index) => {
          this.driverData = <DriverGraphDTO> {fullName:'',data:[]}; 
          response.body!.results.forEach((element) => {
            this.driverData.data.push(element);
          });
          this.driverData.fullName = res.body!.results[index].name + " " +res.body!.results[index].surname;
          this.driverData.data.reverse();
          this.allData.push(this.driverData);
        });
        this.dataLoaded = true;
        console.log(this.allData);
      });
    });
  }

  changeGraphs(){
    this.dataLoaded = false;
    this.driverData =  <DriverGraphDTO> {fullName:'',data:[]};
    this.allData = [];
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
    this.driverService.getAll().subscribe((res) => {
      console.log(res);
      let driverRidesObservables:Observable<HttpResponse<UserRidesListDTO>>[]= [];
      res.body!.results.forEach((driver) => {
          let currentDriver = driver;
          driverRidesObservables.push(this.driverService.getDriverRides(currentDriver.id,0,9000,null,utcDateStart?.toISOString(),utcDateEnd?.toISOString()));
      });
      forkJoin(driverRidesObservables).subscribe((responses) => {
        responses.forEach((response,index) => {
          this.driverData = <DriverGraphDTO> {fullName:'',data:[]}; 
          response.body!.results.forEach((element) => {
            this.driverData.data.push(element);
          });
          this.driverData.fullName = res.body!.results[index].name + " " +res.body!.results[index].surname;
          this.driverData.data.reverse();
          this.allData.push(this.driverData);
        });
        this.dataLoaded = true;
        console.log(this.allData);
      });
    });
  }

  public downloadAsPDF() {
    let reportContent = document.getElementById("report-content");
    reportContent!.style.border = "0px";
    html2canvas(reportContent!)
  .then((canvas) => {
    const pdf = new jsPDF();
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
    pdf.save('report.pdf');
  });
     
  }

}
