import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocationDTO } from '../unregistered-user/components/route-form/LocationDTO';

@Injectable({
  providedIn: 'root'
})

export class RouteFormService {
  private Location$ = new BehaviorSubject<any>({});
  selectLocation$ = this.Location$.asObservable();

  private Cancel$ = new BehaviorSubject<any>({});
  RemoveMarkers$ = this.Cancel$.asObservable();
  constructor() { }
  setLocation(Location: any) {
    this.Location$.next(Location);
  }
  RemoveAllMarkers() {
    this.Cancel$.next(true);
  }

  private routeRemoval$ = new BehaviorSubject<any>({});
  routeRemovalSubject$ = this.routeRemoval$.asObservable();
  clearRoute(){
    this.routeRemoval$.next(true);
  }

}


