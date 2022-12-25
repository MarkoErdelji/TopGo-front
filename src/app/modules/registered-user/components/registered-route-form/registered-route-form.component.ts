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

@Component({
  selector: 'app-registered-route-form',
  templateUrl: './registered-route-form.component.html',
  styleUrls: ['./registered-route-form.component.css']
})
export class RegisteredRouteFormComponent implements OnInit {
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

  forAnimals?:boolean;

  forBabies?:boolean;


   isDisabled = true;

   selectedDriver? :DriverInfoDTO;

   currentLocation?:LocationDTO;


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
    this.routeFormService.RemoveAllMarkers();
    this.driverService.getAll().subscribe(value => {

      for (let driver of value.results) {
        this.driverService.getDriverVehicle(driver.id).subscribe(vehicle => {
          if (this.goForm.get("carType")?.value == "" || this.goForm.get("carType")?.value == vehicle.vehicleType) {
            if (!this.goForm.get("forBabies")?.value && !this.goForm.get("forPets")?.value)
              this.driverService.setLocation(driver);

            if (this.goForm.get("forBabies")?.value) {
              if (vehicle.babyTransport)
                if (this.goForm.get("forPets")?.value)
                  if (vehicle.petTransport)
                    this.driverService.setLocation(driver);
            } else if (this.goForm.get("forPets")?.value)
              if (vehicle.petTransport)
                if (this.goForm.get("forBabies")?.value)
                  if (vehicle.babyTransport)
                    this.driverService.setLocation(driver);
          }


        })


      }
    })
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
      let vehType :string = "STANDARD";
      if(vehicle.vehicleType == "0")
      vehType = "STANDARD"
      if(vehicle.vehicleType == "1")
        vehType = "LUXURY"
      if(vehicle.vehicleType == "2")
        vehType = "VAN"
      this.vehicleTypeRide = vehType;
      this.numberOfSeats = vehicle.passengerSeats;
      this.forAnimals= vehicle.petTransport;
      this.forBabies = vehicle.babyTransport;
    })
  }

  goForm = new FormGroup({
    location: new FormControl("",[Validators.required]),
    destination: new FormControl("",[Validators.required]),
    carType: new FormControl(""),
    forBabies: new FormControl(),
    forPets: new FormControl()
  });

  constructor(private routeFormService:RouteFormService ,private driverService:DriverService ,private mapService:MapService) { }

  ngOnInit(): void {
    this.mapService.selectDriver$.subscribe({next:(driver:DriverInfoDTO)=>{
        if (driver.id) {
          this.selectedDriver = driver;
          // @ts-ignore
          this.popupContent.nativeElement.style.display = 'block';
          this.driverName = driver.name + " " + driver.surname;
          this.driverPhone= driver.telephoneNumber;
          this.driverEmail = driver.email;
          this.isDisabled = false;
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
}
