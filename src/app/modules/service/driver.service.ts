import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import {AllDriversDTO} from "../DTO/AllDriversDTO";
import {BehaviorSubject, catchError, map, mergeMap, Observable, of} from "rxjs";
import {VehicleInfoDTO} from "../DTO/VehicleInfoDTO";
import {GeoLocationDTO} from "../DTO/GeoLocationDTO";
import {DriverInfoDTO} from "../DTO/DriverInfoDTO";
import { Router } from '@angular/router';
import { RideDTO } from '../DTO/RideDTO';
import { SortParameters } from '../DTO/SortParameters';
import { UserRidesListDTO } from '../DTO/UserRidesListDTO';
import {PassengerInfoDTO} from "../DTO/PassengerInfoDTO";
import {DriverActivityDTO} from "../DTO/DriverActivityDTO";
import {StartTimeDTO} from "../DTO/StartTimeDTO";
import {EndTimeDTO} from "../DTO/EndTimeDTO";
import {WorkHoursDTO} from "../DTO/WorkHoursDTO";
import {DriverWorkHoursDTO} from "../DTO/DriverWorkHoursDTO";
import {DocumentInfoDTO} from "../DTO/DocumentInfoDTO";


@Injectable({
  providedIn: 'root'
})
export class DriverService {
  available: boolean = true;
  id?:number;

  endpoint: string = 'http://localhost:8000/api/driver';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private base64Subject = new BehaviorSubject<string>('initial value');
  base64Observable$ = this.base64Subject.asObservable();


  private availability = new BehaviorSubject<boolean>(true);
  currentAvailability = this.availability.asObservable();

  updateToggle(state: boolean) {
    this.availability.next(state);
  }

  constructor(private http: HttpClient,private router:Router) { }

  setAvailability(availability:boolean){
    this.available = availability
  }
  getAvailability(){
    return this.available;
  }

  private Location$ = new BehaviorSubject<any>({});
  selectLocation$ = this.Location$.asObservable();

  getAll(): Observable<HttpResponse<AllDriversDTO>> {
    return this.http.get<AllDriversDTO>(this.endpoint,{

      observe: 'response',
      responseType: 'json'
    });
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

  getDriverRides(driverId,page,size,sortParamm,begintime,endtime){
    if(page == null){
      page = 0
    }
    if(size == null){
      size = 10000
    }
    if(sortParamm == null){
      sortParamm = 'START';
    }
    if(begintime != null && endtime != null){
      return this.http.get<UserRidesListDTO>(this.endpoint+"/"+driverId+"/ride",{params: { page: page, size: size,sort:sortParamm.toLowerCase(),beginDateInterval:begintime,endDateInterval:endtime },observe: 'response',
      responseType: 'json'});
    }
    else if(begintime != null){
      return this.http.get<UserRidesListDTO>(this.endpoint+"/"+driverId+"/ride",{params: { page: page, size: size,sort:sortParamm.toLowerCase(),beginDateInterval:begintime },observe: 'response',
      responseType: 'json'});
    }
    else if(endtime != null){
      return this.http.get<UserRidesListDTO>(this.endpoint+"/"+driverId+"/ride",{params: { page: page, size: size,sort:sortParamm.toLowerCase(),endDateInterval:endtime },observe: 'response',
      responseType: 'json'});
    }
    else if(sortParamm != null){
      return this.http.get<UserRidesListDTO>(this.endpoint+"/"+driverId+"/ride",{params: { page: page, size: size,sort:sortParamm.toLowerCase()},observe: 'response',
      responseType: 'json'});
    }
    else{
      return this.http.get<UserRidesListDTO>(this.endpoint+"/"+driverId+"/ride",{params: { page: page, size: size},observe: 'response',
      responseType: 'json'});
    }

  }

  setImageUrl(url: string) {
    this.base64Subject.next(url);
  }

  getImageUrl() {
    return this.base64Subject.asObservable();
  }

  addWorkingHour(driverId:number, timeDTO:StartTimeDTO){
    return this.http.post<WorkHoursDTO>(this.endpoint+"/"+driverId+"/working-hour", JSON.stringify(timeDTO), {'headers': this.headers,
      observe: 'response',
      responseType: 'json'})
  }

  updateWorkingHour(workHourId:number, timeDTO:EndTimeDTO){
    return this.http.put<WorkHoursDTO>(this.endpoint+"/working-hour/"+workHourId, JSON.stringify(timeDTO),{'headers':this.headers,observe: 'response',
      responseType: 'json'});
  }

  updateDriverActivity(updatedDriverDTO:DriverActivityDTO, driverId:number){
    console.log(updatedDriverDTO)
    return this.http.put<DriverActivityDTO>(this.endpoint+"/"+driverId+"/activity", updatedDriverDTO,{'headers':this.headers,observe: 'response',
      responseType: 'json'});
  }

  getDriverWorkingHours(driverId:number): Observable<DriverWorkHoursDTO> {
    return this.http.get<DriverWorkHoursDTO>(this.endpoint +"/"+ driverId +"/working-hour");
  }

  addDriverDocument(driverId:number, createDocumentDTO: any){
    return this.http.post<DocumentInfoDTO>(this.endpoint+"/"+driverId+"/documents", JSON.stringify(createDocumentDTO),{'headers':this.headers,observe: 'response',
      responseType: 'json'});
  }

}



