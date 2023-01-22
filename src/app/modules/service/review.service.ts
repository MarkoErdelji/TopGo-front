import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RideReviewDTO, RideReviewListDTO } from '../DTO/RideReviewDTO';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  endpoint: string = 'http://localhost:8000/api/review';

  constructor(private http: HttpClient,private router:Router) { }

  getVehicleReviews(vehicleId:number): Observable<RideReviewListDTO> {
    return this.http.get<RideReviewListDTO>(this.endpoint +"/vehicle/"+ vehicleId);
  }

  getDriverReviews(driverId:number): Observable<RideReviewListDTO> {
    return this.http.get<RideReviewListDTO>(this.endpoint +"/driver/"+ driverId);
  }

  getRideReviews(rideId:number): Observable<any> {
    return this.http.get<any>(this.endpoint +"/ride/"+ rideId);
  }
}
