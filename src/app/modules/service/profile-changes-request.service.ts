import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import { DriverInfoDTO } from '../DTO/DriverInfoDTO';
import {AllProfileChangesRequestsDTO} from "../DTO/AllProfileChangesRequestsDTO";
import {AllDriversDTO} from "../DTO/AllDriversDTO";

@Injectable({
  providedIn: 'root'
})
export class ProfileChangesRequestService {

  constructor(private http:HttpClient) { }

  private headers = { 'content-type': 'application/json'}
  postChangeRequest(changes:DriverInfoDTO){
    return this.http.post<any>('http://localhost:8000/api/profileChangesRequest', JSON.stringify(changes),{'headers':this.headers})
 }
 getAllRequests(): Observable<AllProfileChangesRequestsDTO>{
    return this.http.get<AllProfileChangesRequestsDTO>('http://localhost:8000/api/profileChangesRequest')
 }

 updateDriver(driverDTO: DriverInfoDTO){
    return this.http.put('http://localhost:8000/api/driver/'+driverDTO.id, JSON.stringify(driverDTO), {'headers':this.headers})
 }

  deleteRequest(id:number){
    return this.http.delete('http://localhost:8000/api/profileChangesRequest/' + id+'/delete',{'headers':this.headers} )
  }

}
