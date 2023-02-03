import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UnregisteredUserDTO, UnregisteredUserResponseDTO } from '../DTO/UnregisteredUserDTO';

@Injectable({
  providedIn: 'root'
})
export class UnregisteredUserService {

  headers = { 'content-type': 'application/json'}
  endpoint: string = 'http://localhost:8000/api/unregisteredUser';

  constructor(private http: HttpClient,private router:Router) { }

  getAssumption(unregisteredUserDTO:UnregisteredUserDTO): Observable<any> {
    return this.http.post<UnregisteredUserResponseDTO>(this.endpoint,unregisteredUserDTO,{'headers':this.headers,observe: 'response',
      responseType: 'json'});
  }
}
