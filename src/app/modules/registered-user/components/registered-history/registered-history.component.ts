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

@Component({
  selector: 'app-registered-history',
  templateUrl: './registered-history.component.html',
  styleUrls: ['./registered-history.component.css']
})
export class RegisteredHistoryComponent implements OnInit {
  lista: RideDTO[] = [];
  date: string = '';

  historyItems: HTMLElement[] = [];
  currentHistoryItem?: HTMLElement;
  selectedRide?: RideDTO;
  itemLoaded: boolean = false;

  passengerInfo:PassengerInfoDTO[] = [];
  vehicleReviews: DisplayReviewDTO[] = [];
  driverReviews: DisplayReviewDTO[] = [];
  startDateOnlyDate: string = '';
  startDate: string = '';
  endDate: string = '';
  driver!: DriverInfoDTO;
  constructor(private userService:UserService, private rideService:RideService, private authService: AuthService, private passengerService:RegisteredService, private reviewService:ReviewService) { }

  ngOnInit(): void {
    this.passengerService.getPassengerRides(this.authService.getUserId(), "").subscribe(response => {
      for(let ride of response.body!.results){
        if(ride.status == "FINISHED"){
          this.lista.push(ride)
        }
      }
    })
  }

  historyItemClick(i: number) {
    this.itemLoaded = true;
    console.log(i)
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
    for(let passenger of this.selectedRide.passengers){
      this.passengerService.getPassengerById(passenger.id).subscribe(passenger=>{
        this.passengerInfo.push(passenger)
      })
    }
    this.userService.getUserById(String(this.selectedRide.driver.id)).subscribe(driver=>{
      this.driver = driver
    })
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
      this.itemLoaded=true;
    })


  }
}
