import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeoLocationDTO } from '../DTO/GeoLocationDTO';
import { LocationDTO } from '../unregistered-user/components/route-form/LocationDTO';

@Injectable({
  providedIn: 'root'
})

export class RouteFormService {
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


  private vehicleLocation$ = new BehaviorSubject<any>({});
  vehicleLocationSubject$ = this.vehicleLocation$.asObservable();
  changeMarkerLocation(newLocation:GeoLocationDTO){
    this.RemoveAllMarkers()
    this.vehicleLocation$.next(newLocation);
  }
}


