import { Component, OnInit } from '@angular/core';
import {RideDTO} from "../../../DTO/RideDTO";
import {RideService} from "../../../service/ride.service";
import {AuthService} from "../../../../_service/auth.service";
import {RegisteredService} from "../../../service/registered.service";
import {UserListResponseDTO} from "../../../DTO/UserListDTO";
import {PassengerInfoDTO} from "../../../DTO/PassengerInfoDTO";
import {DisplayReviewDTO} from "../../../DTO/DisplayReviewDTO";
import {ReviewService} from "../../../service/review.service";
import {UserService} from "../../../service/user.service";
import {DriverInfoDTO} from "../../../DTO/DriverInfoDTO";
import {FormControl, FormGroup} from "@angular/forms";
import {SortParameters} from "../../../DTO/SortParameters";
import {ActivatedRoute} from "@angular/router";
import {RideNotificationComponent} from "../../../../components/dialogs/ride-notification/ride-notification.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-registered-history',
  templateUrl: './registered-history.component.html',
  styleUrls: ['./registered-history.component.css']
})
export class RegisteredHistoryComponent implements OnInit {
  lista: RideDTO[] = [];
  date: string = '';
  userid;
  historyItems: HTMLElement[] = [];
  currentHistoryItem?: HTMLElement;
  selectedRide?: RideDTO;
  itemLoaded: boolean = false;
  rideDtos:RideDTO[] = []

  passengerInfo:PassengerInfoDTO[] = [];
  vehicleReviews: DisplayReviewDTO[] = [];
  driverReviews: DisplayReviewDTO[] = [];
  startDateOnlyDate: string = '';
  startDate: string = '';
  endDate: string = '';
  driver!: DriverInfoDTO;
  sortForm = new FormGroup({
    selectControl: new FormControl(),
    startControl: new FormControl(),
    endControl: new FormControl(),
  });
  selectedSortParam:string = "";
  sortParams: (string | SortParameters)[] | undefined;

  constructor(private dialog:MatDialog, private route:ActivatedRoute, private userService:UserService, private rideService:RideService, private authService: AuthService, private passengerService:RegisteredService, private reviewService:ReviewService) {
    this.sortParams = Object.keys(SortParameters).filter(key => !isNaN(Number(SortParameters[key])));
    this.selectedSortParam = SortParameters[0];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userid = params['id'];
    });

    this.passengerService.getPassengerRides(this.authService.getUserId(), "").subscribe(response => {
      for(let ride of response.body!.results){
        if(ride.status == "FINISHED"){
          this.lista.push(ride)
        }
      }
    })
  }

  historyItemClick(i: number) {

    if(this.currentHistoryItem != null){
      // @ts-ignore
      this.historyItems = document.querySelectorAll(".round-wrapper")
      // @ts-ignore
      this.historyItems[i].style.boxShadow = '0 0px 7px -1px rgba(255, 150, 66, 1)'
      this.currentHistoryItem.style.removeProperty("box-shadow")
    }
    else{
      // @ts-ignore
      this.historyItems = document.querySelectorAll(".round-wrapper")
      // @ts-ignore
      this.historyItems[i].style.boxShadow = '0 0px 7px -1px rgba(255, 150, 66, 1)'
    }
    // @ts-ignore
    this.currentHistoryItem = this.historyItems[i];
    this.passengerInfo.splice(0, this.passengerInfo.length)
    this.selectedRide = this.lista[i]
    let dateStart = new Date( this.selectedRide.startTime)
    this.startDate = dateStart.toLocaleString()
    let stringDate = this.selectedRide.startTime;
    let datePart = stringDate.split('T')[0];
    let splitDate = datePart.split('-');
    let d = new Date(parseInt(splitDate[0]),parseInt(splitDate[1])-1,parseInt(splitDate[2]));
    this.startDateOnlyDate = d.toLocaleDateString();
    let dateEnd = new Date( this.selectedRide.endTime)
    this.endDate = dateEnd.toLocaleString()
    for(let passenger of this.selectedRide.passengers){
      this.passengerService.getPassengerById(passenger.id).subscribe(passenger=>{
        this.passengerInfo.push(passenger)
      })
    }
    this.userService.getUserById(String(this.selectedRide.driver.id)).subscribe(driver=>{
      this.driver = driver
    })
    this.driverReviews.splice(0, this.driverReviews.length)
    this.vehicleReviews.splice(0, this.vehicleReviews.length)
    this.reviewService.getRideReviews(this.selectedRide.id).subscribe((review)=>{
      review.forEach(element => {
        this.userService.getUserById(element.passenger.id).subscribe(passengerInfo=>{
          if(element.type == "DRIVER"){
            this.driverReviews.push({passenger:passengerInfo,review:element})
          }
          else if(element.type == "VEHICLE"){
            this.vehicleReviews.push({passenger:passengerInfo,review:element})
          }
        })

      });
      this.itemLoaded = true;

    })


  }

  sort() {
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
    this.rideDtos = [];
    this.passengerService.getPassengerRidesPaginated(this.authService.getUserId(),0,9000,this.selectedSortParam.toLowerCase(),utcDateStart?.toISOString(),utcDateEnd?.toISOString()).subscribe(response=>{
      console.log(response)
      response.body!.results.forEach((element)=>{
        this.rideDtos.push(element);
      })
    })
    this.lista = this.rideDtos;
  }
}
