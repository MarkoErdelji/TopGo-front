import {Component, ElementRef, OnInit, ViewChild,OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocationDTO} from "../../../unregistered-user/components/route-form/LocationDTO";
import {RouteFormService} from "../../../service/route-form.service";
import {DriverService} from "../../../service/driver.service";
import {AllDriversDTO} from "../../../DTO/AllDriversDTO";
import {DriverInfoDTO} from "../../../DTO/DriverInfoDTO";
import {BehaviorSubject, EMPTY, of, Subscription} from "rxjs";
import {GeoLocationDTO} from "../../../DTO/GeoLocationDTO";
import {MapService} from "../../../../components/map/map.service";
import {Location} from "@angular/common";
import {DistanceAndAverageDTO} from "../../../DTO/DistanceAndAverageDTO";
import {CreateRideDTO} from "../../../DTO/CreateRideDTO";
import {RegisteredService} from "../../../service/registered.service";
import {RideService} from "../../../service/ride.service";
import {UserRef} from "../../../DTO/UserRef";
import {RouteForCreateRideDTO} from "../../../DTO/RouteForCreateRideDTO";
import {catchError} from "rxjs/operators";
import {PassengerSocketService} from "../../../service/passenger-socket.service";
import {RideDTO} from "../../../DTO/RideDTO";
import {VehicleInfoDTO} from "../../../DTO/VehicleInfoDTO";
import {AuthService} from "../../../../_service/auth.service";
import  { MatDialog } from '@angular/material/dialog';
import {ChatDialogComponent} from "./registered-route-form-dialogs/chat-dialog/chat-dialog.component";
import { UserService } from 'src/app/_service/user.service';
import { RideNotificationComponent } from 'src/app/components/dialogs/ride-notification/ride-notification.component';
import {PanicDialogComponent} from "./registered-route-form-dialogs/panic-dialog/panic-dialog.component";
import {PassengerInfoDTO} from "../../../DTO/PassengerInfoDTO";
import { NotificationDialogComponent } from '../registered-dialogs/notification-dialog/notification-dialog.component';
import {FavouriteRideDTO} from "../../../DTO/FavouriteRideDTO";
import {
  FavouriteNameDialogComponent
} from "./registered-route-form-dialogs/favourite-name-dialog/favourite-name-dialog.component";
import {FavouriteRideInfoDTO} from "../../../DTO/FavouriteRideInfoDTO";
import {ReviewDialogComponent} from "./registered-route-form-dialogs/review-dialog/review-dialog.component";


@Component({
  selector: 'app-registered-route-form',
  templateUrl: './registered-route-form.component.html',
  styleUrls: ['./registered-route-form.component.css']
})
export class RegisteredRouteFormComponent implements OnInit {

  currentRide?:RideDTO;
  currentVehicle?:VehicleInfoDTO;
  distance?:number;
  average?:number;
  ridePrice?:number;
  rideStatus?:string;
  @ViewChild('departure') departure?: ElementRef;
  @ViewChild('destination') destination?: ElementRef;
  @ViewChild('popupContent') popupContent?: ElementRef;
  @ViewChild('confirmRide') confirmRide?: ElementRef;
  @ViewChild('confirmRideInfo') confirmRideInfo?: ElementRef;
  @ViewChild('formDiv') formDiv?: ElementRef;
  selectedTime: Date | undefined;
  driverName?:string;
  driverPhone?:string;
  driverEmail?:string;
  destinationP?:string;
  departureP?:string;
  driverNameRide?:string;
  driverPhoneRide?:string;
  addedToFav:boolean = false;
  driverEmailRide?:string;
  vehicleNameRide?:string;
  vehicleTypeRide?:string;
  numberOfSeats?:number;
  driverImage?:string;
  forAnimals?:boolean;
  isVisible: boolean = false;
  acceptedBtn: boolean = true;
  activeBtn: boolean = true;
  msg?:string;
  friends:PassengerInfoDTO[]=[];
  acceptedFriends:UserRef[]=[];
  favouriteRides:FavouriteRideInfoDTO[]=[];

  allInvitedFriends:UserRef[]=[];
  friendInvites = new Map<number, string>();

  forBabies?:boolean;
  dateControl = new FormControl();


   isDisabled = true;

   selectedDriver? :DriverInfoDTO;

   currentLocation?:LocationDTO;

   selectedFormInput: any;
   notSelectedFormInput: any;

  private subscriptions: Subscription[] = [];



    async go(id: string) {

      if (id == "go-button") {
        if (this.goForm.valid) {
          let locationDTO: LocationDTO = <LocationDTO>{
            location: this.goForm.get("location")?.value!,
            destination: this.goForm.get("destination")?.value!
          }
            this.GoPressed(locationDTO);
          }

      }
      if (id == "order-button")
      {
        this.orderPressed();
      }

      if (id == "cancel-button")
      {
        this.cancelPressed();
      }
      if (id == "favourite-button")
      {
        this.openDialogName();

      }



    }
    public favouriteRide(name:string)
    {

      let favRide:FavouriteRideDTO
      favRide = <FavouriteRideDTO>
        {
          favoriteName: name,
          locations: [],
          passengers: this.allInvitedFriends,
          vehicleType: '',
          babyTransport: false,
          petTransport: false
        };

      let forBabies :boolean = this.goForm.get("forBabies")?.value
      let forPets:boolean = this.goForm.get("forPets")?.value
      if (this.goForm.get("forBabies")?.value == undefined)
        forBabies = false;
      if (this.goForm.get("forPets")?.value == undefined)
        forPets = false;
      favRide!.babyTransport = forBabies;
      favRide!.petTransport = forPets;
      let carType:string;
      if(this.goForm.get("carType")?.value == "1")
      {
        carType = "STANDARD"
      }
      if(this.goForm.get("carType")?.value == "2")
      {
        carType = "LUXURY"
      }
      if(this.goForm.get("carType")?.value == "3")
      {
        carType = "VAN"
      }
      favRide!.vehicleType = carType!;


      this.subscriptions.push(this.mapService.search(this.currentLocation!.location).subscribe({
        next: (departure) => {
          let geo:GeoLocationDTO = <GeoLocationDTO>{
            address:  this.currentLocation!.location,
            longitude : departure[0].lon,
            latitude: departure[0].lat

          };
          favRide!.locations.push(<RouteForCreateRideDTO>{});
          favRide!.locations[0].departure = geo!;
          console.log(location)
          this.subscriptions.push(this.mapService.search(this.currentLocation!.destination).subscribe({
            next: (destination) => {
              let geo:GeoLocationDTO = <GeoLocationDTO>
                {
                  address:this.currentLocation!.destination,
                  longitude : destination[0].lon,
                  latitude : destination[0].lat
                };
              favRide!.locations[0].destination = geo;
              console.log(favRide)
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
              })


            }
          }))
        }}));

    }

  public cancelPressed() {
    this.routeFormService.RemoveAllMarkers();
    // @ts-ignore
    this.popupContent.nativeElement.style.display = 'none';
  }

  private GoPressed(locationDTO:LocationDTO) {
      this.passengerSocketService.initializeWebSocketConnectionFriendResponse(this.authService.getUserId());
    this.routeFormService.RemoveAllMarkers();
    this.favVisible = true;
    this.isDisabled = true;
    // @ts-ignore
    this.popupContent.nativeElement.style.display = 'none';
      this.currentLocation = locationDTO;
      this.routeFormService.setLocation(locationDTO)
      // @ts-ignore
      document.getElementById("moreOptions").style.display = "block"
      document.getElementById("test")!.style.top = "60%"



  }

  private orderPressed() {
      let scheduleDate:Date | null = this.dateControl.value
      console.log(scheduleDate);
      if(scheduleDate == null){
        scheduleDate = new Date();
        scheduleDate.setSeconds(scheduleDate.getSeconds()+10);
      }
      else if(scheduleDate.getTime() < Date.now()){
        const dialogRef = this.dialog.open(RideNotificationComponent, {
          width: '250px',
          data: {msg:"Can not select time before now !!"}
        });
        return;
      }
      else if(scheduleDate.getTime() > (Date.now()+18000000)){
        const dialogRef = this.dialog.open(RideNotificationComponent, {
          width: '250px',
          data: {msg:"Can not select time after 5 hours from now !!"}
        });
        return;
      }
      let utcDate;
      if(scheduleDate.getTime() < (Date.now()+900000)){
        utcDate = null;
      }
      else{
        let utcTime = scheduleDate.getTime();
        utcDate = new Date(Date.UTC(scheduleDate.getFullYear(),scheduleDate.getMonth(),scheduleDate.getDate(),scheduleDate.getHours(),scheduleDate.getMinutes(),scheduleDate.getSeconds()));
      }

      let ride:CreateRideDTO;

      ride = <CreateRideDTO>
          {
            locations: [],
            passengers: this.acceptedFriends,
            vehicleType: '',
            babyTransport: false,
            petTransport: false,
            scheduledTime: utcDate
          };

      let forBabies :boolean = this.goForm.get("forBabies")?.value
      let forPets:boolean = this.goForm.get("forPets")?.value
      if (this.goForm.get("forBabies")?.value == undefined)
        forBabies = false;
      if (this.goForm.get("forPets")?.value == undefined)
        forPets = false;
      ride!.babyTransport = forBabies;
      ride!.petTransport = forPets;
      let carType:string;
      if(this.goForm.get("carType")?.value == null){
        const dialogRef = this.dialog.open(RideNotificationComponent, {
          width: '250px',
          data: {msg:"You must select a car type!"}
        });
        return;
      }
      if(this.goForm.get("carType")?.value == "1")
      {
        carType = "STANDARD"
      }
      if(this.goForm.get("carType")?.value == "2")
      {
        carType = "LUXURY"
      }
      if(this.goForm.get("carType")?.value == "3")
      {
        carType = "VAN"
      }
      ride!.vehicleType = carType!;


    this.subscriptions.push(this.mapService.search(this.currentLocation!.location).subscribe({
      next: (departure) => {
        let geo:GeoLocationDTO = <GeoLocationDTO>{
          address:  this.currentLocation!.location,
          longitude : departure[0].lon,
          latitude: departure[0].lat

        };
        ride!.locations.push(<RouteForCreateRideDTO>{});
        ride!.locations[0].departure = geo!;
        console.log(location)
        this.subscriptions.push(this.mapService.search(this.currentLocation!.destination).subscribe({
          next: (destination) => {
            let geo:GeoLocationDTO = <GeoLocationDTO>
              {
                address:this.currentLocation!.destination,
                longitude : destination[0].lon,
                latitude : destination[0].lat
              };
            ride!.locations[0].destination = geo;

              console.log(ride);
              this.subscriptions.push(this.rideService.createRide(ride!).pipe(
                catchError((error) => {
                  if (error.status === 404) {
                    console.log("no drivers")
                    return EMPTY;
                  }
                  return of(null);
                })
              ).subscribe(response =>
              {
                if(response!=null){
                  if(response.body.status == "SCHEDULED"){
                    return;
                  }
                  // @ts-ignore
                  this.confirmRide.nativeElement.style.display = 'block';
                  this.SetRide(response.body);
                }

            }));
          }
        }))
      }}));





  }

  private SetRide(ride:RideDTO) {
    this.currentRide = ride;
    this.rideStatus = ride.status;
    console.log(ride)
    this.subscriptions.push(this.driverService.getDriverById(ride.driver.id).subscribe(driver => {
      this.selectedDriver = driver;
      this.showDriverInfo(this.selectedDriver!);
      this.driverService.setLocation(this.selectedDriver!);
      this.InitConfirmRide();
    }));
  }

  rideActive(ride: RideDTO) {

    this.activeBtn = false;
    this.acceptedBtn = true;
    // @ts-ignore
    this.formDiv.nativeElement.style.display = 'none';
    // @ts-ignore
    this.confirmRide.nativeElement.style.display = 'none';
    // @ts-ignore
    this.confirmRideInfo.nativeElement.style.backgroundColor = "white";
    this.rideStatus = ride.status;
    // @ts-ignore
    this.popupContent.nativeElement.appendChild(this.confirmRideInfo.nativeElement);



  }
  rideAccepted(ride: RideDTO) {
    this.acceptedBtn = false;
    this.activeBtn = true;
    // @ts-ignore
    this.formDiv.nativeElement.style.display = 'none';
    // @ts-ignore
    this.confirmRide.nativeElement.style.display = 'none';
    // @ts-ignore
    this.confirmRideInfo.nativeElement.style.backgroundColor = "white";
    this.rideStatus = ride.status;
    // @ts-ignore
    this.popupContent.nativeElement.appendChild(this.confirmRideInfo.nativeElement);


  }

  private InitConfirmRide() {
    // @ts-ignore

    // @ts-ignore
    this.driverNameRide = this.selectedDriver.name + " " + this.selectedDriver.surname;
    // @ts-ignore
    this.driverPhoneRide = this.selectedDriver.telephoneNumber;
    // @ts-ignore
    this.driverEmailRide = this.selectedDriver.email;
    // @ts-ignore
    this.subscriptions.push(this.mapService.search(this.currentLocation?.location).subscribe(res =>
    {

      let result = (res[0].display_name).split(",");
      // @ts-ignore
      this.departureP = result[1] + " " + result[0];
    }))
    // @ts-ignore
    this.subscriptions.push(this.mapService.search(this.currentLocation?.destination).subscribe(res =>
    {

      let result = (res[0].display_name).split(",");
      // @ts-ignore
      this.destinationP = result[1] + " " + result[0];
    }))

    // @ts-ignore
    this.subscriptions.push(this.driverService.getDriverVehicle(this.selectedDriver.id).subscribe(vehicle =>
    {

      this.vehicleNameRide = vehicle.model;
      this.vehicleTypeRide = vehicle.vehicleType;
      this.numberOfSeats = vehicle.passengerSeats;
      this.forAnimals= vehicle.petTransport;
      this.forBabies = vehicle.babyTransport;


    }))
  }

  goForm = new FormGroup({
    location: new FormControl("",[Validators.required]),
    destination: new FormControl("",[Validators.required]),
    carType: new FormControl(""),
    forBabies: new FormControl(),
    forPets: new FormControl(),
    friendEmail : new FormControl()
  });
  favForm = new FormGroup({
    favRouteSelect: new FormControl("",[Validators.required])
  });
  favVisible: boolean = false;




  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      console.log(subscription)
      subscription.unsubscribe()});
  }
  ngOnInit(): void {

    let location = this.routeFormService.getLocation()
    let destination = this.routeFormService.getDestination()
    this.goForm.controls.location.setValue(location)
    this.goForm.controls.destination.setValue(destination)
    this.routeFormService.setForm("", "")
    this.rideService.getFavouriteRide().subscribe(response =>
    this.subscriptions.push(this.rideService.getFavouriteRide().subscribe(response =>

    {
      this.favouriteRides = response
    })));
    this.subscriptions.push(this.passengerService.getPassengerById(this.authService.getUserId()).subscribe(passenger => {
      let userRef: UserRef = <UserRef>
        {
          id: passenger.id,
          email: passenger.email

        }
      this.allInvitedFriends.push(userRef);
      this.acceptedFriends.push(userRef);
    }));

    this.subscriptions.push(this.passengerSocketService.selectReturnRide$.subscribe({next:(ride:RideDTO)=>{
        if(ride.id) {
          this.currentRide = ride;
          this.rideStatus = ride.status;
          if (ride.status == "PENDING"){
            this.driverService.getDriverVehicle(ride.driver.id).subscribe((result)=>{
              this.vehicleNameRide = result.model
             this.vehicleTypeRide = result.vehicleType
            })
            this.driverService.getDriverById(ride.driver.id).subscribe((result)=>{
              this.selectedDriver = result;
              this.showDriverInfo(this.selectedDriver!);
              this.driverService.setLocation(this.selectedDriver!);
            })
          }
          if (ride.status == "ACCEPTED")
          {
            this.rideAccepted(ride);
          }
          if (ride.status == "ACTIVE")
          {
            this.rideActive(ride);
          }
          if (ride.status == "FINISHED")
          {
            this.activeBtn = true;
          }
          if (ride.status == "PANIC")
          {
            this.activeBtn = true;
          }
          if (ride.status == "CANCELED")
          {
            this.acceptedBtn = true;
          }
          if (ride.status == "SCHEDULED"){
            const dialogRef = this.dialog.open(RideNotificationComponent, {
              width: '250px',
              data: {msg:"Your scheduled ride for:" + ride.startTime+" has been accepted by one of our drivers!"}
            });
          }
          if (ride.status == "DECLINED"){

          }
        }

      }
    }));
    this.subscriptions.push(this.passengerSocketService.selectResponse$.subscribe(friendResponse =>
    {
      console.log("OVO")
      console.log(friendResponse)
      console.log("OVO")
      if(friendResponse.status == "ACCEPTED")
      {
        this.friendInvites.set(friendResponse.invitedId,"ACCEPTED");
        this.passengerService.getPassengerById(friendResponse.invitedId).subscribe(pass =>
        {
          let userRef:UserRef =
            {
              id : pass.id,
              email: pass.email
            }
          this.acceptedFriends.push(userRef);
        })

      }
      if(friendResponse.status == "REJECTED")
      {
        this.friendInvites.set(friendResponse.invitedId,"REJECTED");
      }
    }))

    this.subscriptions.push(this.passengerSocketService.selectReturnError$.subscribe({next:(error:string)=>{
        if(error == "No drivers left!"){
          this.closeOrder();
          const dialogRef = this.dialog.open(RideNotificationComponent, {
            width: '250px',
            data: {msg:"No more drivers are left for your ride!"}
          });
        }
    }}))
    this.selectedFormInput = this.goForm.get("location")
    this.notSelectedFormInput = this.goForm.get("destination")

    this.subscriptions.push(this.mapService.selectDistanceAndAverage$.subscribe({next:(distance:DistanceAndAverageDTO)=>{
      this.distance = distance.distance;
      this.average = distance.average;
      let vehType:string = "1"
      if(this.vehicleTypeRide! == "STANDARD")
        vehType ="1"
      if(this.vehicleTypeRide! == "LUXURY")
        vehType ="2"
      if(this.vehicleTypeRide! == "VAN")
        vehType ="3"

      this.driverService.getVehiclePrice(vehType).subscribe(price  =>
    {
        console.log(price)
        this.ridePrice = price * this.distance!;
        console.log(this.ridePrice)
        console.log(this.distance)
    })


      } }))

    this.subscriptions.push(this.mapService.selectMapClick$.subscribe({next:(adress:string)=>{
      if(adress != "[object Object]") {
        this.selectedFormInput.setValue(adress);
        [this.selectedFormInput,this.notSelectedFormInput] = [this.notSelectedFormInput,this.selectedFormInput];

      }
      }
    }))
    this.CheckForRides();


  }

  public fillLocationAndDestination(location:string, destination:string){
    this.goForm.get("location")?.setValue(location)
    this.goForm.get("destination")?.setValue(destination)
  }

  private CheckForRides() {
    this.subscriptions.push(this.rideService.getPassengerPendingRide(this.authService.getUserId()).pipe(
      catchError((error) => {
        if (error.status === 404) {
          console.log("no ride!")
          return EMPTY;
        }
        return of(null);
      })
    ).subscribe(ride => {
      if (ride != null) {
        this.currentRide = ride;
        // @ts-ignore
        this.confirmRide.nativeElement.style.display = 'block';

        let locationDTO: LocationDTO = <LocationDTO>{
          location: ride.locations[0].departure.address,
          destination: ride.locations[0].destination.address
        }
        this.SetRide(ride);
        this.currentLocation = locationDTO;
        this.routeFormService.setLocation(locationDTO)
        this.favVisible = true;
        console.log(this.currentRide);
      }
    }))
    this.subscriptions.push(this.rideService.getPassengerAcceptedRide(this.authService.getUserId()).pipe(
      catchError((error) => {
        if (error.status === 404) {
          console.log("no ride!")
          return EMPTY;
        }
        return of(null);
      })
    ).subscribe(ride => {
      if (ride != null) {

        let locationDTO: LocationDTO = <LocationDTO>{
          location: ride.locations[0].departure.address,
          destination: ride.locations[0].destination.address
        }
        this.SetRide(ride);
        this.rideAccepted(ride);
        this.currentLocation = locationDTO;
        this.routeFormService.setLocation(locationDTO)
        this.currentRide = ride;
        this.favVisible = true;
        console.log(this.currentRide);
      }
    }))
    this.subscriptions.push(this.rideService.getPassengerActiveRide(this.authService.getUserId()).pipe(
      catchError((error) => {
        if (error.status === 404) {
          console.log("no ride!")
          return EMPTY;
        }
        return of(null);
      })
    ).subscribe(ride => {
      if (ride != null) {

        let locationDTO: LocationDTO = <LocationDTO>{
          location: ride.locations[0].departure.address,
          destination: ride.locations[0].destination.address
        }
        this.SetRide(ride);
        this.rideActive(ride);
        this.currentLocation = locationDTO;
        this.routeFormService.setLocation(locationDTO)
        this.currentRide = ride;
        this.favVisible = true;
        console.log(this.currentRide);
      }
    }))
  }

  private showDriverInfo(driver: DriverInfoDTO) {
    this.selectedDriver = driver;
    // @ts-ignore
    this.popupContent.nativeElement.style.display = 'block';
    this.driverName = driver.name + " " + driver.surname;
    this.driverPhone = driver.telephoneNumber;
    this.driverEmail = driver.email;
    this.driverNameRide = driver.name + " " + driver.surname;
    this.driverPhoneRide = driver.telephoneNumber;
    this.driverEmailRide = driver.email;
    this.driverImage = driver.profilePicture;
    this.isDisabled = false;
  }

  orderRide() {



  }
  public closeOrder() {
    this.cancelPressed()
    // @ts-ignore
    this.confirmRide.nativeElement.style.display = 'none';

  }




  destinaionInFocus() {
    this.selectedFormInput = this.goForm.get("destination")
    this.notSelectedFormInput =  this.goForm.get("location")

  }

  departureInFocus() {
    this.selectedFormInput = this.goForm.get("location")
    this.notSelectedFormInput = this.goForm.get("destination")

  }

  withdrawRide() {
    this.subscriptions.push(this.rideService.withdraw(this.currentRide?.id).subscribe(ride => this.currentRide));

  }


  openDialog(): void {
    const dialogRef = this.dialog.open(ChatDialogComponent, {
      width: '400px',
      data: {ride: this.currentRide}
    });

  }
  constructor(private userService:UserService,public dialog: MatDialog,private authService:AuthService,private passengerSocketService:PassengerSocketService,private routeFormService:RouteFormService ,private driverService:DriverService ,private mapService:MapService,private passengerService:RegisteredService,private rideService:RideService) { }

  openDialogPanic() {
    const dialogRef = this.dialog.open(PanicDialogComponent, {
      width: '400px',
      data: {ride: this.currentRide}
    });

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        this.rideStatus = result.body.ride.status;
      }
    }));
  }

  openDialogName() {
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


  inviteFriend(email:string) {
    if(email == "")email = this.goForm.get("friendEmail")?.value;
    this.subscriptions.push(this.userService.getUserByEmail(email).subscribe(result =>
    {
      this.goForm.get("friendEmail")?.setValue("")
      this.passengerService.getPassengerById(result.body.id).subscribe(pass =>
      {
        if (!this.friends.find(friend => friend.id === pass.id)) {
          document.getElementById("test")!.style.top = "53%"
          if(this.friends.length<=3)
            if(pass.id! != this.authService.getUserId()) {
              console.log(pass.id)
              this.passengerService.invite(pass.id).subscribe(response =>
              {
                let invUserRef:UserRef =
                  {
                    id : pass.id,
                    email: pass.email
                  }
                this.allInvitedFriends.push(invUserRef)
                this.friends.push(pass);
                this.friendInvites.set(pass.id,"PENDING");

              })


            }
        }

      })

    }))

  }

  favouriteEntered() {
    if (this.favForm.valid)
    {
      let favRoute:FavouriteRideInfoDTO = JSON.parse(JSON.stringify(this.favForm.get("favRouteSelect")?.value!));
      this.favVisible = true;
      let locationDTO: LocationDTO = <LocationDTO>{
        location: favRoute.locations[0].departure.address,
        destination: favRoute.locations[0].destination.address,
      }
      this.GoPressed(locationDTO);
      // @ts-ignore
      this.goForm.get("location")?.setValue(favRoute.locations[0].departure.address)
      // @ts-ignore
      this.goForm.get("destination")?.setValue(favRoute.locations[0].destination.address)
      let carType:string = "";
      if(favRoute.vehicleType == "STANDARD")
      {
        carType = "1"
      }
      if(favRoute.vehicleType == "LUXURY")
      {
        carType = "2"
      }
      if(favRoute.vehicleType == "VAN")
      {
        carType = "3"
      }
      this.goForm.get("carType")?.setValue(carType);
      this.goForm.get("forPets")?.setValue(favRoute.petTransport);
      this.goForm.get("forBabies")?.setValue(favRoute.babyTransport);
      favRoute.passengers.forEach(passenger =>
      {
        this.inviteFriend(passenger.email);
      })
    }

  }
}
