import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DriverInfoDTO} from "../../modules/DTO/DriverInfoDTO";
import {DistanceAndAverageDTO} from "../../modules/DTO/DistanceAndAverageDTO";

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  search(street: String): Observable<any> {
    return this.http.get(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street
    );
  }

  reverseSearch(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>`
    );
  }
  private Driver$ = new BehaviorSubject<any>({});
  selectDriver$ = this.Driver$.asObservable();
  setDriver(Location: DriverInfoDTO) {
    this.Driver$.next(Location);
  }

  private DistanceAndAverage$ = new BehaviorSubject<any>({});
  selectDistanceAndAverage$ = this.DistanceAndAverage$.asObservable();
  setDistanceAndAverage(DaA: DistanceAndAverageDTO) {
    this.DistanceAndAverage$.next(DaA);
  }

  private MapClick$ = new BehaviorSubject<any>({});
  selectMapClick$ = this.MapClick$.asObservable();
  setMapClick(address: string) {
    this.MapClick$.next(address);
  }

}
