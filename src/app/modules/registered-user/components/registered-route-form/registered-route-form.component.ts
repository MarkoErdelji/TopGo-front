import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LocationDTO} from "../../../unregistered-user/components/route-form/LocationDTO";
import {RouteFormService} from "../../../service/route-form.service";
import {DriverService} from "../../../service/driver.service";

@Component({
  selector: 'app-registered-route-form',
  templateUrl: './registered-route-form.component.html',
  styleUrls: ['./registered-route-form.component.css']
})
export class RegisteredRouteFormComponent implements OnInit {


    go(id: string) {
      if(id == "go-button") {
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
          this.driverService.getAll().subscribe((result)=> {
            result.results.forEach(function (value) {
              console.log(value)
            });
          });
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
