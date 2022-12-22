import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocationDTO} from "../../../unregistered-user/components/route-form/LocationDTO";
import {RouteFormService} from "../../../service/route-form.service";
import {DriverService} from "../../../service/driver.service";
import {AllDriversDTO} from "../../../DTO/AllDriversDTO";
import {DriverInfoDTO} from "../../../DTO/DriverInfoDTO";

@Component({
  selector: 'app-registered-route-form',
  templateUrl: './registered-route-form.component.html',
  styleUrls: ['./registered-route-form.component.css']
})
export class RegisteredRouteFormComponent implements OnInit {


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
          try {
            let drivers:AllDriversDTO = await this.driverService.getAll();
            console.log(drivers);
            for (let driver of drivers.results) {
              console.log(driver.email)
            }
          } catch (error) {
            console.error(error);
          }
          // @ts-ignore

          /*ngOnInit(): void {
            this.route.params.subscribe((params) => {
              this.wineService
                .getWine(+params['wineId'])
                .subscribe((wine) => (this.wine = wine));
            });
          }
        }*/

        }
      }


    }
  goForm = new FormGroup({
    location: new FormControl("",[Validators.required]),
    destination: new FormControl("",[Validators.required])
  });

  constructor(private routeFormService:RouteFormService ,private driverService:DriverService) { }

  ngOnInit(): void {
    console.log("bla");
  }}
