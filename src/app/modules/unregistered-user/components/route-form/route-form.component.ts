import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { LocationDTO } from './LocationDTO';
import { RouteFormService } from '../../../service/route-form.service';
import {DriverService} from "../../../service/driver.service";
import {MapService} from "../../../../components/map/map.service";

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.css']
})
export class RouteFormComponent implements OnInit {
  routeForm = new FormGroup({
    location: new FormControl("", [Validators.required]),
    destination: new FormControl("", [Validators.required])

  });

  selectedFormInput: any;
  notSelectedFormInput: any;
  constructor(private routeFormService: RouteFormService, private driverService: DriverService, private mapService:MapService) {
  }

  ngOnInit(): void {
    this.mapService.selectDriver$.subscribe({next:(driver)=>{
        console.log(driver)
      } })
    this.selectedFormInput = this.routeForm.get("location")
    this.notSelectedFormInput = this.routeForm.get("destination")
    this.mapService.selectMapClick$.subscribe({next:(adress:string)=>{
        if(adress != "[object Object]") {
          this.selectedFormInput.setValue(adress);
          [this.selectedFormInput,this.notSelectedFormInput] = [this.notSelectedFormInput,this.selectedFormInput];

        }

      } })
  }

  submit() {
    if(this.routeForm.valid){
      let locationDTO: LocationDTO=<LocationDTO>{
        location: this.routeForm.get("location")?.value!,
        destination: this.routeForm.get("destination")?.value!
      }
      this.routeFormService.setLocation(locationDTO)

      this.driverService.getAll().subscribe(value =>
      {

        for(let driver of value.body!.results)
        {

          this.driverService.setLocation(driver);


        }
      })
    }


  }



}
