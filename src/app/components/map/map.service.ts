import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {DriverInfoDTO} from "../../modules/DTO/DriverInfoDTO";

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
  private Location$ = new BehaviorSubject<any>({});
  selectLocation$ = this.Location$.asObservable();
  setDriver(Location: DriverInfoDTO) {
    this.Location$.next(Location);
  }

}
