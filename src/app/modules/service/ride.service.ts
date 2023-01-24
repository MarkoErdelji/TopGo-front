import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AllDriversDTO} from "../DTO/AllDriversDTO";
import {CreateRideDTO} from "../DTO/CreateRideDTO";
import {RejectionTextDTO} from "../DTO/RejectionTextDTO";
import { RideDTO } from '../DTO/RideDTO';


@Injectable({
  providedIn: 'root'
})
export class RideService {
  headers = { 'content-type': 'application/json'}
  endpoint: string = 'http://localhost:8000/api/ride';

  constructor(private http: HttpClient,private router:Router) { }

  createRide(ride:CreateRideDTO): Observable<any> {
    return this.http.post<any>(this.endpoint,ride,{'headers':this.headers,observe: 'response',
      responseType: 'json'});
  }

  acceptRide(rideId){
    return this.http.put<any>(this.endpoint+"/"+rideId+"/accept",{'headers':this.headers,observe: 'response',
    responseType: 'json'});
  }

  simulateRide(rideId){
    return this.http.put<any>(this.endpoint+"/simulate/"+rideId,{'headers':this.headers,observe: 'response',
    responseType: 'json'});
  }
  withdraw(rideId){
    return this.http.put<RideDTO>(this.endpoint+"/"+rideId+"/withdraw",{'headers':this.headers,observe: 'response',
      responseType: 'json'});
  }

  startRide(rideId){
    return this.http.put<any>(this.endpoint+"/"+rideId+"/start",{'headers':this.headers,observe: 'response',
      responseType: 'json'});
  }

  finishRide(rideId){
    return this.http.put<any>(this.endpoint+"/"+rideId+"/end",{'headers':this.headers,observe: 'response',
      responseType: 'json'});
  }

  declineRide(rideId, rejectionTextDTO:RejectionTextDTO){
    return this.http.put<any>(this.endpoint+"/"+rideId+"/decline",JSON.stringify(rejectionTextDTO),{'headers':this.headers,observe: 'response',
    responseType: 'json'});
  }

  getPassengerPendingRide(id:number){
    return this.http.get<RideDTO>(this.endpoint+"/passenger/"+id+"/pending")
  }
  getPassengerAcceptedRide(id:number){
    return this.http.get<RideDTO>(this.endpoint+"/passenger/"+id+"/accepted")
  }

  getDriverAcceptedRide(id:number){
    return this.http.get<RideDTO>(this.endpoint+"/driver/"+id+"/accepted")
  }

  getDriverActiveRide(id:number){
    return this.http.get<RideDTO>(this.endpoint+"/driver/"+id+"/active")
  }

}
