import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';
import { DriverInfoDTO } from '../DTO/DriverInfoDTO';

@Injectable({
  providedIn: 'root'
})
export class ProfileChangesRequestService {

  constructor(private http:HttpClient) { }

  private headers = { 'content-type': 'application/json'}  
  postChangeRequest(changes:DriverInfoDTO){
    return this.http.post<any>('http://localhost:8000/api/profileChangesRequest', JSON.stringify(changes),{'headers':this.headers})
 }
}
