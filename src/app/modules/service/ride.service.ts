import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AllDriversDTO} from "../DTO/AllDriversDTO";
import {CreateRideDTO} from "../DTO/CreateRideDTO";

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
}
