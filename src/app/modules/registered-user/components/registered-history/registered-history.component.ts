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
import {ActivatedRoute, Router} from "@angular/router";
import {RideNotificationComponent} from "../../../../components/dialogs/ride-notification/ride-notification.component";
import {MatDialog} from "@angular/material/dialog";
import {
  FavouriteNameDialogComponent
} from "../registered-route-form/registered-route-form-dialogs/favourite-name-dialog/favourite-name-dialog.component";
import {FavouriteRideDTO} from "../../../DTO/FavouriteRideDTO";
import {RouteForCreateRideDTO} from "../../../DTO/RouteForCreateRideDTO";
import {GeoLocationDTO} from "../../../DTO/GeoLocationDTO";
import {catchError} from "rxjs/operators";
import {EMPTY, of, Subscription} from "rxjs";
import {RouteFormService} from "../../../service/route-form.service";
import {
  ReviewDialogComponent
} from "../registered-route-form/registered-route-form-dialogs/review-dialog/review-dialog.component";

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
  private subscriptions: Subscription[] = [];

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
  addedToFav:boolean = false;
  canRate: boolean = true;

  constructor(private routeFormService: RouteFormService, private router: Router,private dialog:MatDialog, private route:ActivatedRoute, private userService:UserService, private rideService:RideService, private authService: AuthService, private passengerService:RegisteredService, private reviewService:ReviewService) {
    this.sortParams = Object.keys(SortParameters).filter(key => !isNaN(Number(SortParameters[key])));
    this.selectedSortParam = SortParameters[0];
  }

  ngOnInit(): void {
    this.subscriptions.push(this.route.params.subscribe(params => {
      this.userid = params['id'];
    }));
    this.subscriptions.push(
    this.passengerService.getPassengerRides(this.authService.getUserId(), 0, 100000, null, null).subscribe(response => {
      for(let ride of response.body!.results){
        if(ride.status == "FINISHED"){
          this.lista.push(ride)
        }
      }
    }))
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
    this.checkIfCanRate(this.selectedRide)
    this.checkIfFavourite(this.selectedRide)
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
      this.subscriptions.push(
      this.passengerService.getPassengerById(passenger.id).subscribe(passenger=>{
        this.passengerInfo.push(passenger)
      }))
    }
    this.subscriptions.push(
    this.userService.getUserById(String(this.selectedRide.driver.id)).subscribe(driver=>{
      this.driver = driver
    }))
    this.driverReviews.splice(0, this.driverReviews.length)
    this.vehicleReviews.splice(0, this.vehicleReviews.length)
    this.subscriptions.push(
    this.reviewService.getRideReviews(this.selectedRide.id).subscribe((review)=>{
      review.forEach(element => {
        this.subscriptions.push(
        this.userService.getUserById(element.passenger.id).subscribe(passengerInfo=>{
          if(element.type == "DRIVER"){
            this.driverReviews.push({passenger:passengerInfo,review:element})
          }
          else if(element.type == "VEHICLE"){
            this.vehicleReviews.push({passenger:passengerInfo,review:element})
          }
        }))

      });
      this.itemLoaded = true;

    }))


  }

  checkIfCanRate(ride:RideDTO){
    this.subscriptions.push(
    this.reviewService.getRideReviews(ride.id).subscribe(response=>{
      for(let review of response){
        if(review.passenger.id == this.authService.getUserId()){
          this.canRate = false;
          return
        }
      }
    }))

    let dateStart= new Date(ride.startTime)
    let compareDate = new Date(dateStart.setDate(dateStart.getDate() + 3))
    let currentDate = new Date()
    console.log(currentDate>compareDate)
    if(currentDate>compareDate){
      this.canRate = false;
      return

    }
    else{
      this.canRate = true;
    }

  }

  checkIfFavourite(ride:RideDTO){
    this.subscriptions.push(
    this.rideService.getFavouriteRide().subscribe(favouriteRides=>{
      for(let favouriteRide of favouriteRides){
        if(favouriteRide.locations[0].departure.address == ride.locations[0].departure.address && favouriteRide.locations[0].destination.address == ride.locations[0].destination.address){
          this.addedToFav = true;
          return
        }
        else{
          this.addedToFav = false;
        }
      }
    }))

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
    this.subscriptions.push(
    this.passengerService.getPassengerRidesPaginated(this.authService.getUserId(),0,9000,this.selectedSortParam.toLowerCase(),utcDateStart?.toISOString(),utcDateEnd?.toISOString()).subscribe(response=>{
      console.log(response)
      response.body!.results.forEach((element)=>{
        this.rideDtos.push(element);
      })
    }))
    this.lista = this.rideDtos;
  }

  orderAgain() {
    this.routeFormService.setForm(this.selectedRide!.locations[0].departure.address, this.selectedRide!.locations[0].destination.address)
    this.router.navigate(["registered/home"])
  }

  addToFavourite() {
    let name:string = 'null'
    const dialogRef = this.dialog.open(FavouriteNameDialogComponent, {
      width: '400px',
      data: {}
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.favouriteRide(result);
      }
    }));
  }

  private favouriteRide(name:string) {
    let favRide:FavouriteRideDTO

      let geoLocations:RouteForCreateRideDTO[] = []
      let departure: GeoLocationDTO= {
        address: this.selectedRide!.locations[0].departure.address,
        latitude: this.selectedRide!.locations[0].departure.latitude,
        longitude: this.selectedRide!.locations[0].departure.longitude,
      }
    let destination: GeoLocationDTO= {
      address: this.selectedRide!.locations[0].destination.address,
      latitude: this.selectedRide!.locations[0].destination.latitude,
      longitude: this.selectedRide!.locations[0].destination.longitude,
    }
    geoLocations.push({departure:departure, destination: destination, lenght: this.selectedRide!.locations[0].lenght})
    favRide = <FavouriteRideDTO>
      {
        favoriteName: name,
        locations: geoLocations,
        passengers: this.selectedRide!.passengers,
        vehicleType: this.selectedRide!.vehicleType,
        babyTransport: this.selectedRide!.babyTransport,
        petTransport: this.selectedRide!.petTransport
      };
    this.subscriptions.push(
    this.rideService.favouriteRide(favRide).pipe(
      catchError((error) => {
        if (error.status === 400) {
          this.dialog.open(RideNotificationComponent, {
            width: '250px',
            data: {msg:"You must select a car type!"}
          });
          return EMPTY;
        }
        return of(null);
      })
    ).subscribe(response =>
    {
      this.addedToFav = true;
      console.log(response)
    }))

  }

  rateRide() {
    const dialogRef = this.dialog.open(ReviewDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reviewService.addDriverReviews(this.selectedRide!.id,result[1]).subscribe(res =>
        {

          console.log(res)
        });
        this.reviewService.addVehicleReviews(this.selectedRide!.id,result[0]).subscribe(res =>
        {

          console.log(res)
        });
      }
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      console.log(subscription)
      subscription.unsubscribe()});
  }
}
