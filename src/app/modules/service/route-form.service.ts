import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeoLocationDTO } from '../DTO/GeoLocationDTO';
import { LocationDTO } from '../unregistered-user/components/route-form/LocationDTO';
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})

export class RouteFormService {
  location:string = '';
  destination:string ='';

  private Location$ = new BehaviorSubject<any>({});
  selectLocation$ = this.Location$.asObservable();

  private routeRemoval$ = new BehaviorSubject<any>({});
  routeRemovalSubject$ = this.routeRemoval$.asObservable();
  clearRoute(){
    this.routeRemoval$.next(true);
  }
  private Cancel$ = new BehaviorSubject<any>({});
  RemoveMarkers$ = this.Cancel$.asObservable();
  constructor() { }
  setLocation(Location: any) {
    this.Location$.next(Location);
  }
  RemoveAllMarkers() {
    this.Cancel$.next(true);
  }

  setForm(location:string, destination:string) {
    this.location = location
    this.destination = destination
  }

  getLocation() {
    return this.location
  }
  getDestination(){
    return this.destination
  }


  private vehicleLocation$ = new BehaviorSubject<any>({});
  vehicleLocationSubject$ = this.vehicleLocation$.asObservable();
  changeMarkerLocation(newLocation:GeoLocationDTO){
    this.RemoveAllMarkers()
    this.vehicleLocation$.next(newLocation);
  }
}


