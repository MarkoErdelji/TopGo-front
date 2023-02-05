import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { LocationDTO } from './LocationDTO';
import { RouteFormService } from '../../../service/route-form.service';
import {DriverService} from "../../../service/driver.service";
import {MapService} from "../../../../components/map/map.service";
import { GeoLocationDTO } from 'src/app/modules/DTO/GeoLocationDTO';
import { DepartureDestinationDTO, UnregisteredUserDTO } from 'src/app/modules/DTO/UnregisteredUserDTO';
import { UnregisteredUserService } from 'src/app/modules/service/unregistered-user.service';
import { RideNotificationComponent } from 'src/app/components/dialogs/ride-notification/ride-notification.component';
import { Dialog } from '@angular/cdk/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, of, throwError } from 'rxjs';
import { AssumptionDialogComponent } from '../assumption-dialog/assumption-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  constructor(private dialog:MatDialog,private routeFormService: RouteFormService, private driverService: DriverService, private mapService:MapService,private unregisteredUserService:UnregisteredUserService) {
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
      
      
      
      this.mapService.search(locationDTO!.location).subscribe({
        next: (departure) => {
          let geo:GeoLocationDTO = <GeoLocationDTO>{
            address:  locationDTO!.location,
            longitude : departure[0].lon,
            latitude: departure[0].lat

          };
          this.mapService.search(locationDTO!.destination).subscribe({
            next: (destination) => {
              let geo2:GeoLocationDTO = <GeoLocationDTO>
                {
                  address:locationDTO!.destination,
                  longitude : destination[0].lon,
                  latitude : destination[0].lat
                };
                let routeList:DepartureDestinationDTO[] = []
                let route:DepartureDestinationDTO = <DepartureDestinationDTO>{
                  departure:geo,
                  destination:geo2
                }
                routeList.push(route)
                let dto:UnregisteredUserDTO = <UnregisteredUserDTO>{
                  babyTransport:false,
                  petTransport:false,
                  vehicleType:"STANDARD",
                  locations:routeList
                } 
                this.unregisteredUserService.getAssumption(dto).pipe(
                  catchError((error:HttpErrorResponse) => {
                      const dialogRef = this.dialog.open(RideNotificationComponent, {
                        width: '250px',
                        data: {msg:error.error.message},

                      });
                    
                    return of(error);
                  }
                  )
                ).subscribe((res:any)=>{
                  console.log(res)
                  console.log(res)
                  console.log(res)
                  if(res.body!=null){
                    const dialogRef = this.dialog.open(AssumptionDialogComponent, {
                      width: '350px',
                      data: {data:res.body},
                    });
            
                  }
                })

              

            }
          })
        }});
    }


  }



}
