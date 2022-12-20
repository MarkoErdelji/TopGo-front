import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AllDriversDTO} from "../DTO/AllDriversDTO";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  endpoint: string = 'http://localhost:8000/api/driver';

  constructor(private http: HttpClient) { }

  getAll(): Observable<AllDriversDTO> {
    return this.http.get<AllDriversDTO>(this.endpoint);
  }
}



