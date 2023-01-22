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

}
