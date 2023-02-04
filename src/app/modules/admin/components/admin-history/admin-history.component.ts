import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RideNotificationComponent } from 'src/app/components/dialogs/ride-notification/ride-notification.component';
import { DisplayReviewDTO } from 'src/app/modules/DTO/DisplayReviewDTO';
import { DriverInfoDTO } from 'src/app/modules/DTO/DriverInfoDTO';
import { RideDTO } from 'src/app/modules/DTO/RideDTO';
import { SortParameters } from 'src/app/modules/DTO/SortParameters';
import { UserListResponseDTO } from 'src/app/modules/DTO/UserListDTO';
import { DriverService } from 'src/app/modules/service/driver.service';
import { ReviewService } from 'src/app/modules/service/review.service';
import { RideService } from 'src/app/modules/service/ride.service';
import { UserService } from 'src/app/_service/user.service';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.css']
})
export class AdminHistoryComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  rideDtos:RideDTO[] = []
  userid;
  ridesLoaded:boolean = false;
  selectedRide?:RideDTO;
  startDateOnlyDate:string = '';
  startDate:string = '';
  endDate:string = '';
  selectedStart: Date | undefined;
  selectedEnd: Date | undefined;

  sortForm = new FormGroup({
    selectControl: new FormControl(),
    startControl: new FormControl(),
    endControl: new FormControl(),
  });


  driver!:DriverInfoDTO;
  passengerInfo:UserListResponseDTO[] = [];
  driverReviews:DisplayReviewDTO[] = [];
  vehicleReviews:DisplayReviewDTO[] = [];
  itemLoaded:boolean = false;
  selectedSortParam:string;
  selectedDatetime: Date | undefined;
  sortParams: (string | SortParameters)[] | undefined;


  constructor(private dialog:MatDialog,private route:ActivatedRoute,private rideService:RideService,private driverService:DriverService,private reviewService:ReviewService,private userService:UserService) {
    this.sortParams = Object.keys(SortParameters).filter(key => !isNaN(Number(SortParameters[key])));
    this.selectedSortParam = SortParameters[0]; }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.userid = params['id'];
      }));
      console.log(this.userid);
      this.subscriptions.push(this.userService.getUsersRides(this.userid,0,9000,this.selectedSortParam.toLowerCase(),null,null).subscribe(response=>{
      console.log(response)
      response.body!.results.forEach((element)=>{
        if(element.status == "FINISHED"){
          this.rideDtos.push(element);
        }
      })
      this.ridesLoaded = true;
    }))
  }


  sort(){
    if(this.sortForm.controls.endControl.value!= null && this.sortForm.controls.startControl.value!=null){
      if(this.sortForm.controls.endControl.value < this.sortForm.controls.startControl.value){
        const dialogRef = this.dialog.open(RideNotificationComponent, {
          width: '250px',
          data: {msg:"Start time can not be before end time!"}
        });
        return
      }
    }
    let utcDateEnd:Date|null = null;
    if(this.sortForm.controls.endControl.value != null){
      utcDateEnd = new Date(Date.UTC(this.sortForm.controls.endControl.value.getFullYear(),this.sortForm.controls.endControl.value.getMonth(),this.sortForm.controls.endControl.value.getDate(),this.sortForm.controls.endControl.value.getHours(),this.sortForm.controls.endControl.value.getMinutes(),this.sortForm.controls.endControl.value.getSeconds()));

    }
    let utcDateStart:Date|null = null
    if(this.sortForm.controls.startControl.value !=null){
      utcDateStart = new Date(Date.UTC(this.sortForm.controls.startControl.value.getFullYear(),this.sortForm.controls.startControl.value.getMonth(),this.sortForm.controls.startControl.value.getDate(),this.sortForm.controls.startControl.value.getHours(),this.sortForm.controls.startControl.value.getMinutes(),this.sortForm.controls.startControl.value.getSeconds()));

    }
    console.log(utcDateEnd)
    console.log(utcDateStart)
    this.ridesLoaded = false;
    this.rideDtos = [];
    this.subscriptions.push(this.userService.getUsersRides(this.userid,0,9000,this.selectedSortParam.toLowerCase(),utcDateStart?.toISOString(),utcDateEnd?.toISOString()).subscribe(response=>{
      console.log(response)
      response.body!.results.forEach((element)=>{
          this.rideDtos.push(element);
      })
      this.ridesLoaded = true;
    }))
  }
  selectRide(rideDto:RideDTO){
    if(rideDto.id == this.selectedRide?.id){
      return
    }
    
    let dateStart = new Date( rideDto.startTime)
    this.startDate = dateStart.toLocaleString()
    let stringDate = rideDto.startTime;
    let datePart = stringDate.split('T')[0];
    let splitDate = datePart.split('-');
    let d = new Date(parseInt(splitDate[0]),parseInt(splitDate[1])-1,parseInt(splitDate[2]));
    this.startDateOnlyDate = d.toLocaleDateString();
    let dateEnd = new Date( rideDto.endTime)
    this.endDate = dateEnd.toLocaleString()
    this.driverReviews = [];
    this.vehicleReviews = []
    this.passengerInfo = [];
    this.selectedRide = rideDto;
    this.selectedRide.passengers.forEach((passenger)=>{
      this.subscriptions.push(this.userService.getUserById(passenger.id).subscribe((response)=>
      {
        this.passengerInfo.push(response.body!);
      }))
    })
    this.subscriptions.push(this.reviewService.getRideReviews(this.selectedRide.id).subscribe((review)=>{
      review.forEach(element => {
        this.subscriptions.push(this.userService.getUserById(element.passenger.id).subscribe(passengerInfo=>{
          if(element.type == "DRIVER"){
            this.driverReviews.push({passenger:passengerInfo.body!,review:element})
          }
          else if(element.type == "VEHICLE"){
            this.vehicleReviews.push({passenger:passengerInfo.body!,review:element})
          }
        }))

      });
      this.itemLoaded=true;
    }))
    this.subscriptions.push(this.driverService.getDriverById(this.selectedRide.driver.id).subscribe((driver)=>{
      this.driver = driver;
    }))
  }

ngOnDestroy(){
  this.subscriptions.forEach(subsciption=>{subsciption.unsubscribe()})
}

}
