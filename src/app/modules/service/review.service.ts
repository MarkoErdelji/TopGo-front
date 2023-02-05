import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RideReviewDTO, RideReviewListDTO } from '../DTO/RideReviewDTO';
import {CreateReviewDTO} from "../DTO/CreateReviewDTO";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  headers = { 'content-type': 'application/json'}

  endpoint: string = 'http://localhost:8000/api/review';

  constructor(private http: HttpClient,private router:Router) { }

  getVehicleReviews(vehicleId:number): Observable<RideReviewListDTO> {
    return this.http.get<RideReviewListDTO>(this.endpoint +"/vehicle/"+ vehicleId);
  }

  getDriverReviews(driverId:number): Observable<RideReviewListDTO> {
    return this.http.get<RideReviewListDTO>(this.endpoint +"/driver/"+ driverId);
  }
  addDriverReviews(rideId:number,review:CreateReviewDTO): Observable<any> {
    return this.http.post<any>(this.endpoint +"/"+rideId+"/driver",review,{'headers':this.headers,observe: 'response',
      responseType: 'json'});
  }
  addVehicleReviews(rideId:number,review:CreateReviewDTO): Observable<any> {
    return this.http.post<any>(this.endpoint +"/"+rideId+"/vehicle",review,{'headers':this.headers,observe: 'response',
      responseType: 'json'});
  }

  getRideReviews(rideId:number): Observable<any> {
    return this.http.get<any>(this.endpoint +"/ride/"+ rideId);
  }
}
