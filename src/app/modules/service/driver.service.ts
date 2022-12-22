import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AllDriversDTO} from "../DTO/AllDriversDTO";
import {BehaviorSubject, Observable} from "rxjs";
import {VehicleInfoDTO} from "../DTO/VehicleInfoDTO";
import {GeoLocationDTO} from "../DTO/GeoLocationDTO";
import {DriverInfoDTO} from "../DTO/DriverInfoDTO";


@Injectable({
  providedIn: 'root'
})
export class DriverService {
  endpoint: string = 'http://localhost:8000/api/driver';

  constructor(private http: HttpClient) { }
  private Location$ = new BehaviorSubject<any>({});
  selectLocation$ = this.Location$.asObservable();

  getAll(): Observable<AllDriversDTO> {
    return this.http.get<AllDriversDTO>(this.endpoint);
  }
  getOnlyActive(): Observable<AllDriversDTO>{
    return this.http.get<AllDriversDTO>(this.endpoint+"/active")
  }
  getDriverVehicle(driverId:number): Observable<VehicleInfoDTO> {
    return this.http.get<VehicleInfoDTO>(this.endpoint +"/"+ driverId +"/vehicle");
  }
  setLocation(Location: DriverInfoDTO) {
    this.Location$.next(Location);
  }

}



