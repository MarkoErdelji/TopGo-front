import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocationDTO} from "../../../unregistered-user/components/route-form/LocationDTO";
import {RouteFormService} from "../../../service/route-form.service";
import {DriverService} from "../../../service/driver.service";
import {AllDriversDTO} from "../../../DTO/AllDriversDTO";
import {DriverInfoDTO} from "../../../DTO/DriverInfoDTO";
import {BehaviorSubject} from "rxjs";
import {GeoLocationDTO} from "../../../DTO/GeoLocationDTO";
import {MapService} from "../../../../components/map/map.service";
import {Location} from "@angular/common";
import {DistanceAndAverageDTO} from "../../../DTO/DistanceAndAverageDTO";
import {CreateRideDTO} from "../../../DTO/CreateRideDTO";
import {RegisteredService} from "../../../service/registered.service";
import {RideService} from "../../../service/ride.service";
import {UserRef} from "../../../DTO/UserRef";
import {RouteForCreateRideDTO} from "../../../DTO/RouteForCreateRideDTO";

@Component({
  selector: 'app-registered-route-form',
  templateUrl: './registered-route-form.component.html',
  styleUrls: ['./registered-route-form.component.css']
})
export class RegisteredRouteFormComponent implements OnInit {
  distance?:number;
  average?:number;
  ridePrice?:number;
  @ViewChild('departure') departure?: ElementRef;
  @ViewChild('destination') destination?: ElementRef;
  @ViewChild('popupContent') popupContent?: ElementRef;
  @ViewChild('confirmRide') confirmRide?: ElementRef;
  driverName?:string;
  driverPhone?:string;
  driverEmail?:string;
  destinationP?:string;
  departureP?:string;
  driverNameRide?:string;
  driverPhoneRide?:string;
  driverEmailRide?:string;
  vehicleNameRide?:string;
  vehicleTypeRide?:string;
  numberOfSeats?:number;
  driverImage?:string;
  forAnimals?:boolean;

  forBabies?:boolean;


   isDisabled = true;

   selectedDriver? :DriverInfoDTO;

   currentLocation?:LocationDTO;

   selectedFormInput: any;
   notSelectedFormInput: any;


    async go(id: string) {

      if (id == "go-button") {
        this.GoPressed(id);
      }
      if (id == "search-button")
      {
        this.searchPressed();
      }

      if (id == "cancel-button")
      {
        this.CancelPressed();
      }
      if (id == "confirm-button")
      {
        this.InitConfirmRide();


      }


    }

  private CancelPressed() {
    this.routeFormService.RemoveAllMarkers();
    this.isDisabled = true;
    // @ts-ignore
    this.popupContent.nativeElement.style.display = 'none';
  }

  private GoPressed(id: string) {
    this.routeFormService.RemoveAllMarkers();
    this.isDisabled = true;
    // @ts-ignore
    this.popupContent.nativeElement.style.display = 'none';
    if (this.goForm.valid) {
      console.log((id));
      let locationDTO: LocationDTO = <LocationDTO>{
        location: this.goForm.get("location")?.value!,
        destination: this.goForm.get("destination")?.value!
      }
      this.currentLocation = locationDTO;
      this.routeFormService.setLocation(locationDTO)
      // @ts-ignore
      document.getElementById("moreOptions").style.display = "block"
      document.getElementById("test")!.style.top = "60%"


    }
  }

  private searchPressed() {
      let ride:CreateRideDTO = <CreateRideDTO>
        {
          locations: [],
          passengers: [],
          vehicleType: '',
          babyTransport: false,
          petTransport: false
        };
      ride!.babyTransport = this.goForm.get("forBabies")?.value;
      ride!.petTransport = this.goForm.get("forPets")?.value;
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
      ride!.vehicleType = carType!;
    this.mapService.search(this.currentLocation!.location).subscribe({
      next: (departure) => {
        let geo:GeoLocationDTO = <GeoLocationDTO>{
          address:  this.currentLocation!.location,
          longitude : departure[0].lon,
          latitude: departure[0].lat

        };
        ride!.locations.push(<RouteForCreateRideDTO>{});
        ride!.locations[0].departure = geo!;
        console.log(location)
        this.mapService.search(this.currentLocation!.destination).subscribe({
          next: (destination) => {
            let geo:GeoLocationDTO = <GeoLocationDTO>
              {
                address:this.currentLocation!.destination,
                longitude : destination[0].lon,
                latitude : destination[0].lat
              };
            ride!.locations[0].destination = geo;
            this.passengerService.getPassengerById(this.passengerService.id!).subscribe(passenger =>
            {
              let userRef:UserRef = <UserRef>
                {
                  id : passenger.id,
                  email : passenger.email

                }
              ride!.passengers.push(userRef);
              console.log(ride!);
              this.rideService.createRide(ride!).subscribe(response =>
              {
                console.log(response)
              });
            });
          }
        })
      }});





  }

  private InitConfirmRide() {
    // @ts-ignore
    this.confirmRide.nativeElement.style.display = 'block';
    // @ts-ignore
    this.driverNameRide = this.selectedDriver.name + " " + this.selectedDriver.surname;
    // @ts-ignore
    this.driverPhoneRide = this.selectedDriver.telephoneNumber;
    // @ts-ignore
    this.driverEmailRide = this.selectedDriver.email;
    // @ts-ignore
    this.mapService.search(this.currentLocation?.location).subscribe(res =>
    {

      let result = (res[0].display_name).split(",");
      // @ts-ignore
      this.departureP = result[1] + " " + result[0];
    })
    // @ts-ignore
    this.mapService.search(this.currentLocation?.destination).subscribe(res =>
    {

      let result = (res[0].display_name).split(",");
      // @ts-ignore
      this.destinationP = result[1] + " " + result[0];
    })

    // @ts-ignore
    this.driverService.getDriverVehicle(this.selectedDriver.id).subscribe(vehicle =>
    {

      this.vehicleNameRide = vehicle.model;
      this.vehicleTypeRide = vehicle.vehicleType;
      this.numberOfSeats = vehicle.passengerSeats;
      this.forAnimals= vehicle.petTransport;
      this.forBabies = vehicle.babyTransport;
      let vehType:string = "1"
      if(vehicle.vehicleType == "STANDARD")
        vehType ="1"
      if(vehicle.vehicleType == "LUXURY")
        vehType ="2"
      if(vehicle.vehicleType == "VAN")
        vehType ="3"

      this.driverService.getVehiclePrice(vehType).subscribe(price  =>
    {
        console.log(price)
        this.ridePrice = price * this.distance!;
    })

    })
  }

  goForm = new FormGroup({
    location: new FormControl("",[Validators.required]),
    destination: new FormControl("",[Validators.required]),
    carType: new FormControl(""),
    forBabies: new FormControl(),
    forPets: new FormControl()
  });

  constructor(private routeFormService:RouteFormService ,private driverService:DriverService ,private mapService:MapService,private passengerService:RegisteredService,private rideService:RideService) { }

  ngOnInit(): void {
    this.selectedFormInput = this.goForm.get("location")
    this.notSelectedFormInput = this.goForm.get("destination")
    this.mapService.selectDriver$.subscribe({next:(driver:DriverInfoDTO)=>{
        if (driver.id) {
          this.selectedDriver = driver;
          // @ts-ignore
          this.popupContent.nativeElement.style.display = 'block';
          this.driverName = driver.name + " " + driver.surname;
          this.driverPhone= driver.telephoneNumber;
          this.driverEmail = driver.email;
          this.driverImage = driver.profilePicture;
          this.isDisabled = false;
        }


      } })
    this.mapService.selectDistanceAndAverage$.subscribe({next:(distance:DistanceAndAverageDTO)=>{
      this.distance = distance.distance;
      this.average = distance.average;



      } })

    this.mapService.selectMapClick$.subscribe({next:(adress:string)=>{
      if(adress != "[object Object]") {
        this.selectedFormInput.setValue(adress);
        [this.selectedFormInput,this.notSelectedFormInput] = [this.notSelectedFormInput,this.selectedFormInput];

      }




      } })
  }

  orderRide() {



  }

  cancelOrder() {
    this.CancelPressed()
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
}
