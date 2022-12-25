import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AllDriversDTO} from "../DTO/AllDriversDTO";
import {BehaviorSubject, catchError, map, mergeMap, Observable, of} from "rxjs";
import {VehicleInfoDTO} from "../DTO/VehicleInfoDTO";
import {GeoLocationDTO} from "../DTO/GeoLocationDTO";
import {DriverInfoDTO} from "../DTO/DriverInfoDTO";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DriverService {
  id?:number;

  endpoint: string = 'http://localhost:8000/api/driver';

  private base64Subject = new BehaviorSubject<string>('initial value');
  base64Observable$ = this.base64Subject.asObservable();


  constructor(private http: HttpClient,private router:Router) { }

  private Location$ = new BehaviorSubject<any>({});
  selectLocation$ = this.Location$.asObservable();

  getAll(): Observable<AllDriversDTO> {
    return this.http.get<AllDriversDTO>(this.endpoint);
  }
  getVehiclePrice(vehicleTypeId:string): Observable<number> {
    return this.http.get<number>('http://localhost:8000/api/vehicle/type/' + vehicleTypeId);
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
  getDriverById(id:number){
     return this.http.get<any>(this.endpoint+"/"+id)
  }
  getDriversDocumentsByDriverId(id:number){
    return this.http.get<any>(this.endpoint+"/"+id+"/documents");
  }

  setImageUrl(url: string) {
    this.base64Subject.next(url);
  }

  getImageUrl() {
    return this.base64Subject.asObservable();
  }


}



