import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocationDTO } from '../unregistered-user/components/route-form/LocationDTO';

@Injectable({
  providedIn: 'root'
})

export class RouteFormService {
  private Location$ = new BehaviorSubject<any>({});
  selectLocation$ = this.Location$.asObservable();
  constructor() { }
  setLocation(Location: any) {
    this.Location$.next(Location);
  }
}


