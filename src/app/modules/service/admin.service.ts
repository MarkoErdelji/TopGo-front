import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {DriverDTO} from "../DTO/DriverDTO";
import {VehicleInfoDTO} from "../DTO/VehicleInfoDTO";
import {GeoLocationDTO} from "../DTO/GeoLocationDTO";
import {VehicleDTO} from "../DTO/VehicleDTO";
import {Observable} from "rxjs";
import {DriverInfoDTO} from "../DTO/DriverInfoDTO";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  errorMsg: string | undefined;
  endpoint: string = 'http://localhost:8000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient, public router: Router) { }

  createDriver(driverDTO:DriverDTO){
    return this.http.post(this.endpoint+"/driver", JSON.stringify(driverDTO), {'headers': this.headers,
      observe: 'response',
      responseType: 'json'})
  }

  getDriverByEmail(email:string): Observable<DriverInfoDTO> {
    return this.http.get<DriverInfoDTO>(this.endpoint +"/driver/"+ email +"/byEmail");
  }
  createCurrentLocation(currentLocation: GeoLocationDTO){
    return this.http.post(this.endpoint+"/geoLocation", JSON.stringify(currentLocation),
      {'headers': this.headers,
      observe: 'response',
      responseType: 'json'
    })
  }
  createVehicle(vehicleDTO: VehicleDTO, id: number){
    return this.http.post(this.endpoint+"/driver/"+id+"/vehicle", JSON.stringify(vehicleDTO),
      {'headers': this.headers,
        observe: 'response',
        responseType: 'json'
      })
  }
}
