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

@Component({
  selector: 'app-registered-route-form',
  templateUrl: './registered-route-form.component.html',
  styleUrls: ['./registered-route-form.component.css']
})
export class RegisteredRouteFormComponent implements OnInit {
  @ViewChild('popupContent') popupContent?: ElementRef;
  @ViewChild('driverName') driverName?: ElementRef;
  @ViewChild('driverPhone') driverPhone?: ElementRef;
  @ViewChild('driverEmail') driverEmail?: ElementRef;


    async go(id: string) {
      if (id == "go-button") {
        if (this.goForm.valid) {
          console.log((id));
          let locationDTO: LocationDTO = <LocationDTO>{
            location: this.goForm.get("location")?.value!,
            destination: this.goForm.get("destination")?.value!
          }
          this.routeFormService.setLocation(locationDTO)
          // @ts-ignore
          document.getElementById("moreOptions").style.display = "block"
          document.getElementById("test")!.style.top = "60%"



        }
      }
      if (id == "order-button")
      {
        this.routeFormService.RemoveAllMarkers();
        this.driverService.getAll().subscribe(value =>
        {

          for(let driver of value.results)
          {
            this.driverService.getDriverVehicle(driver.id).subscribe(vehicle =>
             {
              if(this.goForm.get("carType")?.value == "" || this.goForm.get("carType")?.value== vehicle.vehicleType) {
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
      if (id == "cancel-button")
      {
        this.routeFormService.RemoveAllMarkers();
      }


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
    this.mapService.selectLocation$.subscribe({next:(driver:DriverInfoDTO)=>{
        console.log(driver)
        // @ts-ignore
        this.popupContent.nativeElement.style.display = 'block';

        // @ts-ignore
        this.driverName.nativeElement.textContent = driver.name + " " + driver.surname;
        // @ts-ignore
        this.driverPhone.nativeElement.textContent = driver.telephoneNumber;
        // @ts-ignore
        this.driverEmail.nativeElement.textContent = driver.email;


      } })
  }}
