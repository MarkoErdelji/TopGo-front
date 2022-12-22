import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AllDriversDTO} from "../DTO/AllDriversDTO";
import {Observable} from "rxjs";
import {VehicleInfoDTO} from "../DTO/VehicleInfoDTO";


@Injectable({
  providedIn: 'root'
})
export class DriverService {
  endpoint: string = 'http://localhost:8000/api/driver';

  constructor(private http: HttpClient) { }

  async getAll(): Promise<AllDriversDTO> {
    return new Promise<AllDriversDTO>((resolve, reject) => {
        this.http.get<AllDriversDTO>(this.endpoint).subscribe(
          data => {
            resolve(data);
          },
          error => {
            reject(error);
          }
        );
    })
    }
  async getDriverVehicle(id:number): Promise<VehicleInfoDTO> {
    return new Promise<VehicleInfoDTO>((resolve, reject) => {
      this.http.get<VehicleInfoDTO>(this.endpoint+"/").subscribe(
        data => {
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
    })
  }
}



